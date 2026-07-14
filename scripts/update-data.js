#!/usr/bin/env node

import { readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFile = process.env.MOVIE_DATA_FILE || path.join(__dirname, "..", "data", "movie.json");
const dryRun = process.argv.includes("--dry-run");
const now = new Date().toISOString();

const data = JSON.parse(await readFile(dataFile, "utf8"));
validateData(data);

const search = await collectSearchResults(data.automation?.queries || []);
const relevantResults = deduplicate(search.results.filter(isRelevant)).slice(0, 20);
const changes = applyUpdates(data, relevantResults, now);

data.latestNews = relevantResults.slice(0, 12).map((item) => ({
  title: item.title,
  url: item.url,
  source: item.source,
  publishedAt: item.publishedAt,
}));
data._lastUpdated = now;

const output = `${JSON.stringify(data, null, 2)}\n`;
if (dryRun) {
  console.log(JSON.stringify({ provider: search.provider, found: relevantResults.length, changes, dryRun: true }, null, 2));
} else {
  const temporaryFile = `${dataFile}.tmp`;
  await writeFile(temporaryFile, output, "utf8");
  await rename(temporaryFile, dataFile);
  console.log(JSON.stringify({ provider: search.provider, found: relevantResults.length, changes, updated: dataFile }, null, 2));
}

async function collectSearchResults(queries) {
  if (!queries.length) throw new Error("movie.json 中未配置 automation.queries");

  if (process.env.UPDATE_DATA_FIXTURE) {
    return {
      provider: "fixture",
      results: JSON.parse(await readFile(process.env.UPDATE_DATA_FIXTURE, "utf8")),
    };
  }

  if (process.env.TAVILY_API_KEY) {
    try {
      const batches = await Promise.all(queries.map(searchTavily));
      return { provider: "tavily", results: batches.flat() };
    } catch (error) {
      console.warn(`Tavily 搜索失败，改用 Google News RSS：${error.message}`);
    }
  }

  const settled = await Promise.allSettled(queries.map(searchGoogleNews));
  const successful = settled.filter((item) => item.status === "fulfilled");
  if (!successful.length) {
    const reasons = settled.map((item) => item.reason?.message || "未知错误").join("; ");
    throw new Error(`所有联网搜索均失败，已停止写入以保护旧数据：${reasons}`);
  }
  return { provider: "google-news-rss", results: successful.flatMap((item) => item.value) };
}

async function searchTavily(query) {
  const response = await fetchWithTimeout("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: process.env.TAVILY_API_KEY,
      query,
      topic: "news",
      search_depth: "advanced",
      max_results: 8,
      include_answer: false,
    }),
  });
  if (!response.ok) throw new Error(`Tavily HTTP ${response.status}`);
  const payload = await response.json();
  return (payload.results || []).map((item) => ({
    title: cleanText(item.title),
    url: item.url,
    content: cleanText(item.content),
    source: hostname(item.url),
    publishedAt: item.published_date || "",
  }));
}

async function searchGoogleNews(query) {
  const url = new URL("https://news.google.com/rss/search");
  url.searchParams.set("q", `${query} when:14d`);
  url.searchParams.set("hl", "zh-CN");
  url.searchParams.set("gl", "CN");
  url.searchParams.set("ceid", "CN:zh-Hans");
  const response = await fetchWithTimeout(url, { headers: { "User-Agent": "ba-xian-site-updater/1.0" } });
  if (!response.ok) throw new Error(`Google News RSS HTTP ${response.status}`);
  return parseRss(await response.text());
}

async function fetchWithTimeout(url, options = {}) {
  return fetch(url, { ...options, signal: AbortSignal.timeout(20_000) });
}

function parseRss(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => {
    const item = match[1];
    const title = cleanText(readXmlTag(item, "title"));
    const url = decodeEntities(readXmlTag(item, "link"));
    const description = cleanText(readXmlTag(item, "description"));
    const source = cleanText(readXmlTag(item, "source")) || hostname(url);
    const publishedAt = toIsoDate(readXmlTag(item, "pubDate"));
    return { title, url, content: description, source, publishedAt };
  });
}

function applyUpdates(target, results, timestamp) {
  const changes = [];
  const combined = results.map((item) => `${item.title}。${item.content}`);

  const release = findReleaseDate(combined, target.movie.release.date);
  if (release && release !== target.movie.release.date) {
    target.movie.release.originalDate = target.movie.release.date;
    target.movie.release.date = release;
    target.movie.release.display = formatChineseDate(release);
    target.movie.release.note = `最新公开信息显示上映日期调整为${target.movie.release.display}`;
    target.movie.release._lastUpdated = timestamp;
    changes.push("movie.release");
  }

  const rating = findRating(combined);
  if (rating && rating !== target.metrics.maoyanRating.value) {
    target.metrics.maoyanRating = {
      ...target.metrics.maoyanRating,
      value: rating,
      label: `${rating}分`,
      _lastUpdated: timestamp,
    };
    changes.push("metrics.maoyanRating");
  }

  const boxOffice = findBoxOffice(combined, target.metrics.boxOffice);
  if (boxOffice) {
    target.metrics.boxOffice = { ...target.metrics.boxOffice, ...boxOffice, _lastUpdated: timestamp };
    changes.push("metrics.boxOffice");
  }

  const douyinViews = findDouyinViews(combined);
  if (douyinViews && douyinViews.value !== target.metrics.douyinViews.value) {
    target.metrics.douyinViews = { ...target.metrics.douyinViews, ...douyinViews, _lastUpdated: timestamp };
    changes.push("metrics.douyinViews");
  }

  const trailer = results.find((item) => /预告片|正式预告|终极预告/.test(`${item.title} ${item.content}`));
  if (trailer && trailer.url !== target.trailer.url) {
    target.trailer = { url: trailer.url, title: trailer.title, _lastUpdated: timestamp };
    changes.push("trailer");
  }

  return changes;
}

function findReleaseDate(texts, currentDate) {
  const year = currentDate.slice(0, 4);
  const patterns = [
    /提档(?:至|到)?\s*(?:(20\d{2})年)?(\d{1,2})月(\d{1,2})日/,
    /(?:定档|将于)\s*(?:(20\d{2})年)?(\d{1,2})月(\d{1,2})日(?:上映|公映)/,
    /(?:(20\d{2})年)?(\d{1,2})月(\d{1,2})日(?:全国)?(?:上映|公映)/,
  ];
  for (const text of texts) {
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) return `${match[1] || year}-${String(match[2]).padStart(2, "0")}-${String(match[3]).padStart(2, "0")}`;
    }
  }
  return null;
}

function findRating(texts) {
  for (const text of texts) {
    const match = text.match(/猫眼[^。；]{0,24}?(\d(?:\.\d)?)\s*分/);
    if (match) return Number(match[1]);
  }
  return null;
}

function findBoxOffice(texts, current) {
  const candidates = [];
  const patterns = [
    /(?:点映及预售|累计|总)?票房(?:已|达|突破|超|为)?\s*(\d+(?:\.\d+)?)\s*(亿|万)/g,
    /(\d+(?:\.\d+)?)\s*(亿|万)[^。；]{0,12}票房/g,
  ];
  for (const text of texts) {
    for (const pattern of patterns) {
      for (const match of text.matchAll(pattern)) {
        const value = Number(match[1]);
        candidates.push({ value, unit: match[2], normalized: match[2] === "亿" ? value * 10_000 : value });
      }
    }
  }
  if (!candidates.length) return null;
  const best = candidates.sort((a, b) => b.normalized - a.normalized)[0];
  const currentNormalized = current.unit === "亿" ? current.value * 10_000 : current.value;
  if (best.normalized <= currentNormalized) return null;
  return { value: best.value, unit: best.unit, label: `${best.value}${best.unit}`, context: "最新累计票房" };
}

function findDouyinViews(texts) {
  for (const text of texts) {
    const match = text.match(/(?:抖音|话题)[^。；]{0,30}?(\d+(?:\.\d+)?)\s*亿(?:次)?(?:播放|浏览)?/);
    if (match) return { value: Number(match[1]), unit: "亿", label: `${match[1]}亿`, context: "抖音相关话题播放量" };
  }
  return null;
}

function isRelevant(item) {
  const text = `${item.title} ${item.content}`;
  return /八仙[！!]?|All Wishes Come True/i.test(text) && /动画|电影|牟正洋|东方梦工厂|All Wishes/i.test(text);
}

function deduplicate(items) {
  const seen = new Set();
  return items
    .filter((item) => item.title && item.url && !seen.has(item.title) && seen.add(item.title))
    .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));
}

function validateData(value) {
  if (!value?.movie?.title || !value?.movie?.release?.date) throw new Error("movie.json 缺少电影基础信息");
  if (!Array.isArray(value.characters) || value.characters.length !== 8) throw new Error("movie.json 必须包含八位主角");
  if (value.characters.some((character) => !character.name || !character.image)) throw new Error("每位主角必须配置姓名与形象图片");
  if (!Array.isArray(value.voiceCast) || !value.metrics) throw new Error("movie.json 缺少配音或口碑数据");
}

function readXmlTag(text, tag) {
  const match = text.match(new RegExp(`<${tag}(?:\\s[^>]*)?>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`));
  return match?.[1]?.trim() || "";
}

function cleanText(value = "") {
  return decodeEntities(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function decodeEntities(value = "") {
  const named = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (_, entity) => {
    if (entity[0] === "#") {
      const hex = entity[1]?.toLowerCase() === "x";
      return String.fromCodePoint(Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10));
    }
    return named[entity.toLowerCase()] ?? `&${entity};`;
  });
}

function toIsoDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "" : date.toISOString();
}

function hostname(value) {
  try { return new URL(value).hostname.replace(/^www\./, ""); } catch { return ""; }
}

function formatChineseDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return `${year}年${month}月${day}日`;
}

import assert from "node:assert/strict";
import { copyFile, mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.join(scriptsDirectory, "..");

test("增量更新只采用相关新信息并保留既有结构", async () => {
  const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), "ba-xian-update-"));
  const temporaryData = path.join(temporaryDirectory, "movie.json");
  await copyFile(path.join(projectDirectory, "data", "movie.json"), temporaryData);

  try {
    const result = spawnSync(process.execPath, [path.join(scriptsDirectory, "update-data.js")], {
      cwd: projectDirectory,
      encoding: "utf8",
      env: {
        ...process.env,
        MOVIE_DATA_FILE: temporaryData,
        UPDATE_DATA_FIXTURE: path.join(scriptsDirectory, "fixtures", "search-results.json"),
      },
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);

    const updated = JSON.parse(await readFile(temporaryData, "utf8"));
    assert.equal(updated.movie.release.date, "2026-07-19");
    assert.equal(updated.metrics.maoyanRating.value, 9.8);
    assert.equal(updated.metrics.boxOffice.label, "1.2亿");
    assert.equal(updated.metrics.douyinViews.label, "5.1亿");
    assert.equal(updated.trailer.url, "https://example.com/ba-xian-update");
    assert.equal(updated.latestNews.length, 1);
    assert.equal(updated.characters.length, 8);
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
});

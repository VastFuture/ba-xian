import { PageHero } from "@/components/PageHero";
import movieData from "@/data/movie.json";
import Link from "next/link";

const { highlights, latestNews, metrics, movie, voiceCast } = movieData;

export const metadata = { title: "电影介绍" };

export default function MoviePage() {
  return (
    <>
      <PageHero eyebrow="About the movie · 电影介绍" title="凡人为何成仙" seal="真神仙勿入">
        八个没有法力的普通人，一张漏洞百出的入场券，一场闹到蓬莱尽头的冒险。
      </PageHero>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
          <article>
            <p className="section-kicker">故事 · Story</p>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-6xl">成仙以前，<br />先做一回自己。</h2>
            <div className="mt-8 space-y-5 text-lg leading-9 text-ink/70">
              {movie.synopsis.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <blockquote className="relative mt-12 overflow-hidden bg-flame p-7 shadow-poster md:p-10">
              <span className="absolute -right-2 -top-12 font-display text-[10rem] text-ink/[0.06]">问</span>
              <p className="relative font-display text-3xl leading-relaxed md:text-5xl">{movie.motto}</p>
            </blockquote>
          </article>

          <aside className="h-fit border-2 border-ink bg-paper p-6 shadow-poster md:p-8">
            <div className="flex items-start justify-between border-b-2 border-ink pb-5">
              <div><p className="text-xs font-black tracking-[0.25em] text-vermilion">上映档案</p><p className="mt-2 font-display text-3xl">{movie.release.display}</p></div>
              <span className="rotate-6 bg-vermilion px-2 py-1 font-display text-paper">定</span>
            </div>
            <dl className="mt-5 space-y-4">
              <Info label="片长" value={movie.durationLabel} />
              <div className="grid grid-cols-[4rem_1fr] gap-2">
                <dt className="text-sm font-bold text-ink/40">类型</dt>
                <dd className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => <span key={genre} className="border border-ink bg-gold/45 px-2 py-1 text-xs font-black">{genre}</span>)}
                </dd>
              </div>
              <Info label="地区" value={`${movie.country} · ${movie.language}`} />
              <Info label="又名" value={movie.alternateTitle} />
            </dl>
            <p className="mt-6 border-t border-dashed border-ink/25 pt-5 text-xs font-bold leading-6 text-vermilion">{movie.release.note}</p>
          </aside>
        </div>
      </section>

      <section className="border-y-2 border-ink bg-flame px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div><p className="section-kicker text-ink/60">点映战报 · Preview buzz</p><h2 className="mt-3 font-display text-4xl md:text-6xl">人间先传开了</h2></div>
            <p className="max-w-md text-sm leading-7 text-ink/65">{movie.screenings.map((item) => `${item.dates}${item.label}`).join("；")}，口碑与热度持续走高。</p>
          </div>
          <div className="mt-10 grid border-2 border-ink bg-paper sm:grid-cols-3">
            {[metrics.maoyanRating, metrics.boxOffice, metrics.douyinViews].map((metric) => (
              <article key={metric.context} className="border-b-2 border-ink p-6 last:border-b-0 sm:border-b-0 sm:border-r-2 sm:last:border-r-0 md:p-8">
                <p className="font-display text-5xl text-vermilion md:text-6xl">{metric.label}</p>
                <p className="mt-3 text-sm font-black tracking-wider">{metric.context}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {latestNews.length > 0 && (
        <section className="border-b-2 border-ink bg-paper px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-6">
              <div><p className="section-kicker">街头新报 · Latest</p><h2 className="mt-3 font-display text-4xl md:text-6xl">仙界刚传来的消息</h2></div>
              <span className="hidden rotate-3 border-2 border-ink bg-gold px-3 py-1 text-xs font-black md:block">每日更新</span>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {latestNews.slice(0, 6).map((item, index) => (
                <a key={item.url} href={item.url} target="_blank" rel="noreferrer" className="group grid grid-cols-[2.5rem_1fr] gap-4 border-2 border-ink bg-paper p-5 shadow-paper transition hover:-translate-y-1 hover:bg-gold/30">
                  <span className="font-display text-2xl text-vermilion">{String(index + 1).padStart(2, "0")}</span>
                  <span><strong className="block leading-7 group-hover:text-vermilion">{item.title}</strong><small className="mt-2 block text-ink/45">{item.source} · {formatNewsDate(item.publishedAt)}</small></span>
                </a>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/news" className="inline-flex items-center gap-3 border-2 border-ink bg-vermilion px-6 py-3 text-sm font-black tracking-widest text-paper shadow-paper transition hover:-translate-y-1">
                查看全部资讯 <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="border-y-2 border-ink bg-ink px-5 py-16 text-paper md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-5">
            <div><p className="section-kicker text-gold">三帖妙方</p><h2 className="mt-3 font-display text-4xl md:text-6xl">这趟仙，怎么个成法？</h2></div>
            <span className="hidden text-6xl text-flame md:block">✦</span>
          </div>
          <div className="mt-12 grid gap-px bg-paper/20 md:grid-cols-3">
            {highlights.map((item) => (
              <article key={item.number} className="group bg-ink p-7 transition hover:bg-jade md:p-9">
                <p className="font-display text-5xl text-flame transition group-hover:text-gold">{item.number}</p>
                <h3 className="mt-8 text-xl font-black">{item.title}</h3>
                <p className="mt-4 leading-7 text-paper/55 group-hover:text-paper/75">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="section-kicker">幕后 · Credits</p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[0.55fr_1fr]">
            <h2 className="font-display text-5xl md:text-6xl">一桌好戏，<br />众人开席。</h2>
            <dl className="border-t-2 border-ink">
              {movie.credits.map((credit) => (
                <div key={credit.role} className="grid grid-cols-[0.7fr_1fr] border-b border-ink/25 py-5 md:grid-cols-2">
                  <dt className="text-sm font-bold text-ink/45">{credit.role}</dt><dd className="font-bold">{credit.name}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-16">
            <p className="section-kicker">声演 · Voice cast</p>
            <div className="mt-5 overflow-hidden border-2 border-ink">
              {voiceCast.map((item) => (
                <div key={`${item.actor}-${item.role}`} className="grid gap-2 border-b border-ink/20 bg-paper p-4 last:border-b-0 md:grid-cols-[0.8fr_0.8fr_1.4fr] md:items-center md:px-6">
                  <p className="font-black">{item.actor}</p><p className="text-sm text-vermilion">{item.role}</p><p className="text-xs leading-6 text-ink/50">{item.note || "—"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Info({ label, value }) {
  return <div className="grid grid-cols-[4rem_1fr] gap-2"><dt className="text-sm font-bold text-ink/40">{label}</dt><dd className="text-sm font-bold leading-6">{value}</dd></div>;
}

function formatNewsDate(value) {
  if (!value) return "日期待确认";
  return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "numeric", day: "numeric", timeZone: "Asia/Shanghai" }).format(new Date(value));
}

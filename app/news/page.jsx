import { PageHero } from "@/components/PageHero";
import movieData from "@/data/movie.json";

const { _lastUpdated, latestNews, movie } = movieData;

export const metadata = {
  title: "最新资讯",
  description: `动画电影《${movie.title}》最新上映动态、主创访谈、票房口碑与幕后资讯。`,
};

export default function NewsPage() {
  const [featured, ...moreNews] = latestNews;

  return (
    <>
      <PageHero eyebrow="Penglai dispatch · 蓬莱快报" title="仙界刚传来的消息" seal="每日巡街">
        从上映档期到点映票房，从主创访谈到幕后美学——街头巷尾的新鲜事，都收在这张每日更新的号外里。
      </PageHero>

      <section className="relative overflow-hidden px-5 py-14 md:px-8 md:py-20">
        <div className="absolute inset-0 -z-10 bg-paper-grain opacity-70" />
        <div className="mx-auto max-w-7xl">
          <div className="grid border-2 border-ink bg-paper shadow-paper sm:grid-cols-3">
            <Status label="收录资讯" value={`${latestNews.length} 则`} />
            <Status label="更新频率" value="每日巡检" />
            <Status label="最近巡检" value={formatDateTime(_lastUpdated)} />
          </div>

          {featured ? (
            <article className="relative mt-12 overflow-hidden border-2 border-ink bg-flame shadow-poster md:mt-16">
              <div className="absolute -right-4 -top-14 font-display text-[12rem] leading-none text-ink/[0.06]">报</div>
              <div className="relative grid lg:grid-cols-[0.72fr_1.28fr]">
                <div className="flex min-h-64 flex-col justify-between border-b-2 border-ink p-7 lg:border-b-0 lg:border-r-2 lg:p-10">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.3em]">今日头条 · No.01</p>
                    <p className="mt-5 font-display text-6xl leading-none md:text-8xl">号外</p>
                  </div>
                  <div className="mt-10 flex items-center gap-3 text-xs font-bold">
                    <span className="border border-ink px-2 py-1">{categoryOf(featured.title)}</span>
                    <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
                  </div>
                </div>
                <a href={featured.url} target="_blank" rel="noreferrer" className="group flex min-h-64 flex-col justify-between bg-paper/30 p-7 transition hover:bg-gold/35 lg:p-10">
                  <div>
                    <p className="text-xs font-black tracking-[0.22em] text-vermilion">来自 · {featured.source}</p>
                    <h2 className="mt-5 max-w-3xl font-display text-3xl leading-snug transition group-hover:text-vermilion md:text-5xl">{featured.title}</h2>
                  </div>
                  <span className="mt-10 inline-flex items-center gap-3 self-start border-b-2 border-ink pb-1 text-sm font-black tracking-widest">
                    阅读原文 <span className="text-xl transition-transform group-hover:translate-x-1" aria-hidden="true">↗</span>
                  </span>
                </a>
              </div>
            </article>
          ) : (
            <EmptyNews />
          )}

          {moreNews.length > 0 && (
            <div className="mt-14 md:mt-20">
              <div className="flex items-end justify-between border-b-2 border-ink pb-4">
                <div><p className="section-kicker">全部消息 · Archive</p><h2 className="mt-2 font-display text-4xl md:text-5xl">街坊都在传</h2></div>
                <span className="hidden font-display text-3xl text-vermilion sm:block">{String(moreNews.length).padStart(2, "0")}</span>
              </div>
              <div className="grid gap-5 pt-8 md:grid-cols-2 lg:grid-cols-3">
                {moreNews.map((item, index) => (
                  <a key={item.url} href={item.url} target="_blank" rel="noreferrer" className={`news-card group flex min-h-72 flex-col justify-between border-2 border-ink p-6 shadow-paper transition hover:-translate-y-1 hover:shadow-poster ${cardTone(index)}`}>
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="border border-ink px-2 py-1 text-[10px] font-black tracking-widest">{categoryOf(item.title)}</span>
                        <span className="font-display text-2xl text-ink/35">{String(index + 2).padStart(2, "0")}</span>
                      </div>
                      <h3 className="mt-7 text-xl font-black leading-8 transition group-hover:text-vermilion">{item.title}</h3>
                    </div>
                    <div className="mt-8 flex items-end justify-between gap-4 border-t border-ink/25 pt-4 text-xs">
                      <span className="font-black">{item.source}</span>
                      <time className="text-ink/50" dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-t-2 border-ink bg-ink px-5 py-14 text-paper md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.75fr_1.25fr] md:items-center">
          <p className="font-display text-4xl text-flame md:text-6xl">消息会变，<br />真凭实据不变。</p>
          <div className="border-l-2 border-paper/20 pl-6 text-sm leading-8 text-paper/65 md:pl-10">
            <p>本站每日检索《{movie.title}》公开资讯。只有明确匹配影片且包含可靠新信息的内容，才会更新上映日期、评分、票房或预告；没有新证据的字段会保留原值。</p>
            <p className="mt-3 text-gold">资讯标题与来源归原发布媒体所有，点击卡片可阅读原文。</p>
          </div>
        </div>
      </section>
    </>
  );
}

function Status({ label, value }) {
  return <div className="border-b-2 border-ink p-5 last:border-b-0 sm:border-b-0 sm:border-r-2 sm:last:border-r-0"><p className="text-[10px] font-black tracking-[0.25em] text-vermilion">{label}</p><p className="mt-2 font-bold">{value}</p></div>;
}

function EmptyNews() {
  return <div className="mt-12 border-2 border-dashed border-ink p-10 text-center"><p className="font-display text-4xl">今日街巷平安，无新鲜事。</p><p className="mt-3 text-sm text-ink/50">自动巡检完成后，新资讯会出现在这里。</p></div>;
}

function categoryOf(title) {
  if (/提档|定档|上映/.test(title)) return "档期";
  if (/票房|预售|评分|口碑/.test(title)) return "战报";
  if (/专访|导演|编剧/.test(title)) return "人物";
  if (/美学|海报|特辑|预告/.test(title)) return "幕后";
  if (/首映|路演|点映/.test(title)) return "现场";
  return "快讯";
}

function cardTone(index) {
  return ["bg-paper", "bg-gold/30", "bg-jade/15", "bg-flame/25"][index % 4];
}

function formatDate(value) {
  if (!value) return "日期待确认";
  return new Intl.DateTimeFormat("zh-CN", { month: "2-digit", day: "2-digit", timeZone: "Asia/Shanghai" }).format(new Date(value));
}

function formatDateTime(value) {
  if (!value) return "尚未巡检";
  return new Intl.DateTimeFormat("zh-CN", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Shanghai" }).format(new Date(value));
}

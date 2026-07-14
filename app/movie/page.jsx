import { PageHero } from "@/components/PageHero";
import { highlights, movie, team } from "../data";

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
            <p className="mt-8 text-lg leading-9 text-ink/70">{movie.synopsis}</p>
            <blockquote className="relative mt-12 overflow-hidden bg-flame p-7 shadow-poster md:p-10">
              <span className="absolute -right-2 -top-12 font-display text-[10rem] text-ink/[0.06]">问</span>
              <p className="relative font-display text-3xl leading-relaxed md:text-5xl">不问来路，只问去路；<br />不问得失，只问对错。</p>
            </blockquote>
          </article>

          <aside className="h-fit border-2 border-ink bg-paper p-6 shadow-poster md:p-8">
            <div className="flex items-start justify-between border-b-2 border-ink pb-5">
              <div><p className="text-xs font-black tracking-[0.25em] text-vermilion">上映档案</p><p className="mt-2 font-display text-3xl">{movie.releaseDate}</p></div>
              <span className="rotate-6 bg-vermilion px-2 py-1 font-display text-paper">定</span>
            </div>
            <dl className="mt-5 space-y-4">
              <Info label="片长" value={movie.duration} />
              <div className="grid grid-cols-[4rem_1fr] gap-2">
                <dt className="text-sm font-bold text-ink/40">类型</dt>
                <dd className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => <span key={genre} className="border border-ink bg-gold/45 px-2 py-1 text-xs font-black">{genre}</span>)}
                </dd>
              </div>
              <Info label="配音" value={movie.cast.join("、")} />
            </dl>
            <p className="mt-6 border-t border-dashed border-ink/25 pt-5 text-xs leading-6 text-ink/50">{movie.releaseNote}</p>
          </aside>
        </div>
      </section>

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
              {team.map(([role, name]) => (
                <div key={role} className="grid grid-cols-[0.7fr_1fr] border-b border-ink/25 py-5 md:grid-cols-2">
                  <dt className="text-sm font-bold text-ink/45">{role}</dt><dd className="font-bold">{name}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}

function Info({ label, value }) {
  return <div className="grid grid-cols-[4rem_1fr] gap-2"><dt className="text-sm font-bold text-ink/40">{label}</dt><dd className="text-sm font-bold leading-6">{value}</dd></div>;
}

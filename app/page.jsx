import Link from "next/link";
import movieData from "@/data/movie.json";

const { characters, movie } = movieData;

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <section className="relative isolate min-h-[calc(100svh-74px)] overflow-hidden border-b-2 border-ink bg-paper px-5 pb-12 pt-10 md:px-8 md:pb-20 md:pt-16">
        <div className="absolute inset-0 -z-30 bg-paper-grain opacity-65" />
        <div className="absolute -left-24 top-12 -z-20 size-72 rounded-full bg-flame/20 blur-3xl md:size-[28rem]" />
        <div className="absolute -right-32 bottom-0 -z-20 size-80 rounded-full bg-jade/25 blur-3xl md:size-[34rem]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <div className="relative z-10">
            <div className="mb-8 flex items-center gap-3 text-xs font-black tracking-[0.28em] text-vermilion">
              <span className="h-px w-10 bg-vermilion" />
              东方奇幻动画电影
            </div>
            <p className="mb-3 text-sm uppercase tracking-[0.32em] text-ink/55">{movie.englishTitle}</p>
            <h1 className="relative font-display text-[clamp(6rem,18vw,12rem)] leading-[0.78] tracking-[-0.08em] text-ink">
              {movie.title.replace(/[！!]/g, "")}<span className="text-vermilion">!</span>
              <span className="absolute left-[54%] top-[8%] -z-10 size-16 rotate-12 border-4 border-vermilion/70 md:size-24" />
            </h1>
            <p className="mt-10 max-w-xl border-l-4 border-jade pl-5 text-xl font-bold leading-relaxed md:text-2xl">
              八个凡人，硬闯蓬莱。<br /><span className="font-normal text-ink/60">这回，神仙也得讲点人情。</span>
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/movie" className="group inline-flex items-center gap-4 bg-vermilion px-7 py-4 font-black tracking-widest text-paper shadow-poster transition hover:-translate-y-1 hover:shadow-poster-lg">
                立即了解 <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link href="/characters" className="border-b-2 border-ink px-2 py-3 font-bold tracking-widest transition hover:border-jade hover:text-jade">翻开角色图鉴</Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl py-6 lg:py-12">
            <div className="absolute left-2 top-0 z-20 -rotate-6 bg-gold px-4 py-2 font-display text-xl text-ink shadow-paper md:left-0">凡人限定</div>
            <div className="absolute -right-2 bottom-2 z-20 rotate-3 border-4 border-vermilion bg-paper px-5 py-3 text-center shadow-poster md:right-0">
              <p className="text-xs font-black tracking-[0.2em]">全国上映</p>
              <p className="font-display text-3xl text-vermilion">{movie.release.date.slice(5).replace("-", ".")}</p>
            </div>
            <div className="relative rotate-[1.5deg] overflow-hidden border-[10px] border-paper bg-jade p-6 shadow-poster-lg md:p-10">
              <div className="absolute inset-0 bg-wave opacity-30" />
              <div className="relative grid grid-cols-4 gap-3 md:gap-5">
                {characters.map((character, index) => (
                  <div key={character.name} className={`character-tile character-tile-${index % 4} ${index % 2 ? "translate-y-8" : ""}`}>
                    <span className="font-display text-4xl md:text-6xl">{character.mark}</span>
                    <small>{character.name}</small>
                  </div>
                ))}
              </div>
              <div className="relative mt-14 border-t border-paper/30 pt-6 text-paper md:mt-20">
                <p className="font-display text-3xl md:text-5xl">草台班子，神仙阵仗</p>
                <p className="mt-3 text-xs tracking-[0.25em] text-paper/65">蓬莱仙境 · 有求必应 · 人气排行</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 grid max-w-7xl grid-cols-2 border-2 border-ink bg-paper shadow-paper md:grid-cols-4">
          {[["上映", movie.release.display], ["片长", movie.durationLabel], ["类型", movie.genres.slice(0, 2).join(" / ")], ["出品", movie.studio.split("（")[0]]].map(([label, value]) => (
            <div key={label} className="border-ink/20 p-4 odd:border-r md:border-r md:last:border-r-0 md:p-5">
              <p className="text-[10px] font-black tracking-[0.25em] text-vermilion">{label}</p>
              <p className="mt-1 font-bold">{value}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-7xl text-right text-xs font-bold tracking-wider text-vermilion">{movie.release.note}</p>
      </section>

      <section className="bg-flame px-5 py-16 text-ink md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1.3fr] md:items-end">
          <div>
            <span className="inline-block -rotate-2 border-2 border-ink px-3 py-1 text-xs font-black tracking-widest">街坊告示</span>
            <h2 className="mt-5 font-display text-5xl leading-tight md:text-7xl">仙门有路，<br />凡人先行。</h2>
          </div>
          <div className="border-l-2 border-ink/30 pl-6 md:pl-10">
            <p className="text-xl font-bold leading-9 md:text-2xl">“{movie.motto}”</p>
            <p className="mt-5 max-w-xl leading-8 text-ink/65">一群没名号、没法力、没后台的小人物，偏要去神仙的世界里讨一个公道。</p>
          </div>
        </div>
      </section>
    </>
  );
}

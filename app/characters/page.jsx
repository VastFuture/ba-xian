import { PageHero } from "@/components/PageHero";
import movieData from "@/data/movie.json";

const { characters } = movieData;

export const metadata = {
  title: "八仙角色图鉴",
  alternates: { canonical: "/characters" },
};

export default function CharactersPage() {
  return (
    <>
      <PageHero eyebrow="Meet the immortals · 角色图鉴" title="八位街坊，八路神仙" seal="全员凡人">
        他们没仙气、没架子，毛病倒是各有一箩筐。可真到了要紧处，凡人的那点执拗，比法术更管用。
      </PageHero>

      <section className="relative overflow-hidden px-5 py-16 md:px-8 md:py-24">
        <div className="absolute inset-0 -z-10 bg-paper-grain opacity-60" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div><p className="section-kicker">蓬莱临时工名册</p><h2 className="mt-3 font-display text-4xl md:text-6xl">草台班子，全员到齐</h2></div>
            <p className="max-w-sm text-sm leading-7 text-ink/55">请注意：以下人物尚未取得正式仙籍，如遇施法失误，概不接受蓬莱投诉。</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {characters.map((character, index) => (
              <article key={character.name} className={`character-card card-${character.color} group ${index % 3 === 1 ? "lg:translate-y-8" : ""}`}>
                <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden border-b-2 border-ink bg-card">
                  <div className="absolute inset-4 rounded-[50%_45%_55%_40%] border-2 border-ink/15 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                  <span className="absolute right-4 top-4 rotate-6 border border-ink px-2 py-1 text-[10px] font-black tracking-wider">NO.{String(index + 1).padStart(2, "0")}</span>
                  <span className="relative font-display text-8xl text-ink drop-shadow-[4px_4px_0_rgba(253,251,247,0.75)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">{character.mark}</span>
                  <span className="absolute bottom-4 left-4 bg-ink px-3 py-1 text-xs font-black tracking-wider text-paper">{character.tag}</span>
                </div>
                <div className="bg-paper p-5">
                  <p className="text-xs font-bold tracking-widest text-vermilion">{character.alias}</p>
                  <h3 className="mt-2 font-display text-3xl">{character.name}</h3>
                  <p className="mt-2 text-xs font-black text-jade">配音 · {character.voiceActors.join(" / ")}</p>
                  <p className="mt-4 min-h-20 text-sm leading-7 text-ink/60">{character.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t-2 border-ink bg-flame px-5 py-14 text-center md:px-8 md:py-20">
        <p className="font-display text-4xl leading-relaxed md:text-6xl">“仙”字一撇一捺，<br className="md:hidden" />写的还是人。</p>
      </section>
    </>
  );
}

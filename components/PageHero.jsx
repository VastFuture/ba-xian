export function PageHero({ eyebrow, title, seal, children }) {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-jade px-5 py-20 text-paper md:px-8 md:py-28">
      <div className="absolute inset-0 bg-wave opacity-25" />
      <div className="absolute -right-12 top-1/2 size-72 -translate-y-1/2 rounded-full border-[36px] border-paper/5 md:size-[30rem]" />
      <div className="relative mx-auto max-w-7xl">
        <p className="mb-5 inline-block bg-gold px-3 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-ink">{eyebrow}</p>
        <div className="flex min-w-0 items-end gap-5">
          <h1 className="min-w-0 font-display text-5xl leading-[1.08] sm:text-6xl md:text-8xl md:leading-none">{title}</h1>
          <span className="mb-2 hidden rotate-6 border-2 border-paper/70 px-2 py-1 font-display text-lg text-paper/80 sm:block">{seal}</span>
        </div>
        <div className="mt-7 max-w-2xl text-base leading-8 text-paper md:text-lg">{children}</div>
      </div>
    </section>
  );
}

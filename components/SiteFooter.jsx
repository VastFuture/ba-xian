import { movie } from "@/app/data";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-ink bg-ink px-5 py-10 text-paper md:px-8">
      <div className="absolute -right-8 -top-16 font-display text-[10rem] text-paper/[0.035]">仙</div>
      <div className="relative mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-4xl text-flame">八仙！</p>
          <p className="mt-2 text-xs uppercase tracking-[0.28em] text-paper/50">{movie.englishTitle}</p>
        </div>
        <div className="text-sm leading-7 text-paper/60 md:text-right">
          <p>不问来路，只问去路</p>
          <p>© 2026 电影信息展示页</p>
        </div>
      </div>
    </footer>
  );
}

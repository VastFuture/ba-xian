import Link from "next/link";
import movieData from "@/data/movie.json";

const links = [
  ["首页", "/"],
  ["电影", "/movie"],
  ["角色", "/characters"],
  ["资讯", "/news"],
];

export function SiteHeader() {
  return (
    <header className="relative z-50 border-b-2 border-ink/15 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label="八仙电影首页">
          <span className="grid size-10 rotate-3 place-items-center bg-vermilion font-display text-2xl text-paper shadow-stamp transition-transform group-hover:-rotate-3">八</span>
          <span className="hidden font-display text-xl tracking-widest text-ink sm:block">{movieData.movie.title}</span>
        </Link>
        <nav aria-label="主导航" className="flex items-center rounded-full border-2 border-ink/15 bg-paper px-1 py-1 shadow-paper md:gap-2 md:px-1.5">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-full px-2.5 py-2 text-sm font-bold tracking-wider text-ink/75 transition hover:bg-jade hover:text-paper md:px-5">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

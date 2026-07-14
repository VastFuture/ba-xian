import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import movieData from "@/data/movie.json";

const { movie } = movieData;

export const metadata = {
  title: { default: `《${movie.title}》电影官网`, template: `%s｜《${movie.title}》` },
  description: `动画电影《${movie.title}》（${movie.englishTitle}）静态信息展示网站。八个凡人，硬闯蓬莱。`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-paper text-ink antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: { default: "《八仙！》电影官网", template: "%s｜《八仙！》" },
  description: "动画电影《八仙！》（All Wishes Come True!）静态信息展示网站。八个凡人，硬闯蓬莱。",
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

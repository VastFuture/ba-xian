# Sitemap 与搜索引擎收录实施记录

## 背景

为帮助 Google 发现并理解站内页面，本次采用 Next.js Metadata Routes 动态生成 SEO 元数据，并随静态站点一起导出。相关改动已合并到 `main`，提交为 `c0709f4`。

## 实施内容

- 在站点根目录生成 `sitemap.xml`，包含首页、电影、角色和资讯 4 个站内规范页面。
- `lastmod` 只绑定真实的数据更新时间；没有可靠更新时间的页面不伪造该字段。
- 生成 `robots.txt`，允许抓取站点并声明 sitemap 地址。
- 为 4 个页面配置绝对 canonical URL，统一指向生产域名。
- 未添加 `priority` 和 `changefreq`，因为 Google 会忽略这两个字段。
- 未将外部新闻链接写入 sitemap，因为它们不是本站拥有的规范页面。

主要实现文件：

- `app/sitemap.js`
- `app/robots.js`
- `app/site.js`
- `app/layout.jsx`
- `app/page.jsx`
- `app/movie/page.jsx`
- `app/characters/page.jsx`
- `app/news/page.jsx`

## 验证结果

以下检查均已通过：

- 数据更新测试：`npm run test:update-data`
- TypeScript 检查：`npm run typecheck`
- ESLint：`npm run lint`
- Next.js 静态构建：`npm run build`
- `sitemap.xml` XML 格式、4 个绝对站内 URL 与 canonical 输出检查

## 部署状态

2026-07-14 状态快照：部署已经触发，但 Vercel 部署仍处于外部队列中，GitHub Actions 任务显示 `in_progress`。队列完成并切换生产别名后，应提供：

- <https://ba-xian-static.vercel.app/sitemap.xml>
- <https://ba-xian-static.vercel.app/robots.txt>

## 后续操作

在 Google Search Console 中添加并验证站点，然后提交上述 sitemap URL。Sitemap 只帮助搜索引擎发现页面，不保证页面立即收录。

参考资料：

- [Google：构建和提交 Sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=en)
- [Google：指定规范网址](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Next.js：Sitemap Metadata Route](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)

import movieData from "@/data/movie.json";
import { SITE_URL } from "./site";

export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: SITE_URL,
      lastModified: movieData.movie.release._lastUpdated,
    },
    {
      url: `${SITE_URL}/movie`,
      lastModified: movieData._lastUpdated,
    },
    {
      url: `${SITE_URL}/characters`,
    },
    {
      url: `${SITE_URL}/news`,
      lastModified: movieData._lastUpdated,
    },
  ];
}

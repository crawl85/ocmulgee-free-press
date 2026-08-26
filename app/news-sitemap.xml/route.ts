import { articles, site } from "@/lib/content";
import { absoluteUrl, articleDateIso } from "@/lib/seo";

export const dynamic = "force-static";

const TWO_DAYS_IN_MS = 2 * 24 * 60 * 60 * 1000;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const now = Date.now();
  const cutoff = now - TWO_DAYS_IN_MS;

  const urls = articles
    .map((article) => ({
      article,
      publishedTime: articleDateIso(article.date),
    }))
    .filter(({ publishedTime }) => {
      if (!publishedTime) return false;

      const publishedAt = new Date(publishedTime).getTime();
      return publishedAt >= cutoff && publishedAt <= now + 24 * 60 * 60 * 1000;
    })
    .map(
      ({ article, publishedTime }) => `  <url>
    <loc>${escapeXml(absoluteUrl(`/articles/${article.slug}/`))}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(site.name)}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${publishedTime}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
    </news:news>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}

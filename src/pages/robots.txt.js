import { siteConfig } from '../data/config';

export async function GET() {
  const robotsTxt = `
User-agent: *
Allow: /

# Allow search engines to index our content
Allow: /berita/
Allow: /sektor/
Allow: /cari/
Allow: /arsip/

# Disallow admin or private areas (if any exist)
Disallow: /admin/
Disallow: /_astro/
Disallow: /api/

# Special rules for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Finance-specific crawlers
User-agent: YahooSeeker
Allow: /berita/
Allow: /sektor/
Crawl-delay: 2

# Sitemap location
Sitemap: ${siteConfig.siteUrl}/sitemap.xml
Sitemap: ${siteConfig.siteUrl}/rss.xml

# Host directive
Host: ${siteConfig.siteUrl}
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
}
import { getCollection } from 'astro:content';
import { siteConfig } from '../data/config';

export async function GET() {
  const posts = await getCollection('news', ({ data }) => {
    return data.publish !== false;
  });

  const staticPages = [
    '',
    'cari',
    'arsip',
    'tentang',
    'kontak',
    'sektor',
    'sektor/banking',
    'sektor/ipo', 
    'sektor/consumer',
    'sektor/infrastructure',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${siteConfig.siteUrl}/${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '' ? 'daily' : page.includes('sektor') ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : page.includes('sektor') ? '0.8' : '0.6'}</priority>
  </url>`
    )
    .join('')}
  ${posts
    .map((post) => {
      const publishDate = new Date(post.data.publishDate);
      const isRecent = (Date.now() - publishDate.getTime()) < (7 * 24 * 60 * 60 * 1000); // 7 days
      
      return `
  <url>
    <loc>${siteConfig.siteUrl}/berita/${post.id}</loc>
    <lastmod>${publishDate.toISOString()}</lastmod>
    <changefreq>${isRecent ? 'daily' : 'weekly'}</changefreq>
    <priority>${post.data.isBreaking ? '0.9' : isRecent ? '0.8' : '0.7'}</priority>
    ${post.data.isBreaking ? `
    <news:news>
      <news:publication>
        <news:name>Sahamindo</news:name>
        <news:language>id</news:language>
      </news:publication>
      <news:publication_date>${publishDate.toISOString()}</news:publication_date>
      <news:title><![CDATA[${post.data.title}]]></news:title>
      <news:keywords>${[
        post.data.category,
        ...(post.data.tags || []),
        ...(post.data.stockSymbols || [])
      ].filter(Boolean).join(', ')}</news:keywords>
      <news:stock_tickers>${(post.data.stockSymbols || []).join(', ')}</news:stock_tickers>
    </news:news>` : ''}
    ${post.data.featuredImage ? `
    <image:image>
      <image:loc>${siteConfig.siteUrl}${post.data.featuredImage}</image:loc>
      <image:title><![CDATA[${post.data.title}]]></image:title>
      <image:caption><![CDATA[${post.data.excerpt}]]></image:caption>
    </image:image>` : ''}
  </url>`;
    })
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
}
/**
 * SEO optimization utilities for Indonesian finance content
 */

import type { CollectionEntry } from 'astro:content';
import { siteConfig } from '@data/config';
import { getSectorById } from '@data/categories';

export interface SEOMeta {
  title: string;
  description: string;
  canonical?: string;
  openGraph: {
    title: string;
    description: string;
    type: string;
    image?: string;
    locale: string;
    siteName: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image?: string;
  };
  jsonLd: Record<string, any>;
}

/**
 * Generate comprehensive SEO metadata for news articles
 */
export function generateArticleSEO(
  article: CollectionEntry<'news'>,
  canonicalURL?: string
): SEOMeta {
  const { title, excerpt, author, publishDate, category, stockSymbols, isBreaking } = article.data;
  
  // Optimize title for SEO
  const seoTitle = optimizeTitle(title, stockSymbols, isBreaking);
  const seoDescription = optimizeDescription(excerpt, stockSymbols, category);
  
  // Get sector information
  const sector = getSectorById(category);
  
  // Generate JSON-LD structured data
  const jsonLd = generateArticleJsonLd(article);
  
  return {
    title: seoTitle,
    description: seoDescription,
    canonical: canonicalURL,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'article',
      locale: 'id_ID',
      siteName: siteConfig.companyName,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
    },
    jsonLd
  };
}

/**
 * Generate SEO metadata for sector pages
 */
export function generateSectorSEO(sectorId: string): SEOMeta {
  const sector = getSectorById(sectorId);
  
  if (!sector) {
    throw new Error(`Sector not found: ${sectorId}`);
  }
  
  const title = `Berita ${sector.name} - Analisis Saham & Market Update Terkini`;
  const description = `Dapatkan berita terbaru, analisis mendalam, dan update pasar sektor ${sector.name.toLowerCase()} Indonesia. ${sector.description}`;
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${sector.name} - ${siteConfig.companyName}`,
    description: description,
    url: `${siteConfig.siteUrl}/sektor/${sectorId}`,
    mainEntity: {
      '@type': 'ItemList',
      name: `Berita ${sector.name}`,
      description: `Koleksi berita dan analisis sektor ${sector.name}`,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Beranda',
          item: siteConfig.siteUrl
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Sektor',
          item: `${siteConfig.siteUrl}/sektor`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: sector.name,
          item: `${siteConfig.siteUrl}/sektor/${sectorId}`
        }
      ]
    }
  };
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'id_ID',
      siteName: siteConfig.companyName,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    jsonLd
  };
}

/**
 * Generate SEO metadata for search and archive pages
 */
export function generateSystemPageSEO(pageType: 'search' | 'archive'): SEOMeta {
  const pageData = {
    search: {
      title: 'Pencarian Berita Saham Indonesia - Cari Analisis & Market Update',
      description: 'Cari berita saham, analisis pasar, dan update terkini dari bursa efek Indonesia. Filter berdasarkan sektor, kode saham, dan tanggal.',
      type: 'SearchResultsPage'
    },
    archive: {
      title: 'Arsip Berita Saham Indonesia - Koleksi Lengkap Analisis Pasar',
      description: 'Jelajahi arsip lengkap berita dan analisis pasar saham Indonesia yang diorganisir berdasarkan tanggal dan sektor.',
      type: 'CollectionPage'
    }
  };
  
  const { title, description, type } = pageData[pageType];
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description: description,
    url: `${siteConfig.siteUrl}/${pageType === 'search' ? 'cari' : 'arsip'}`,
    mainEntity: {
      '@type': 'WebSite',
      name: siteConfig.companyName,
      url: siteConfig.siteUrl,
      potentialAction: pageType === 'search' ? {
        '@type': 'SearchAction',
        target: `${siteConfig.siteUrl}/cari?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      } : undefined
    }
  };
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'id_ID',
      siteName: siteConfig.companyName,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    jsonLd
  };
}

/**
 * Optimize title for Indonesian finance SEO
 */
function optimizeTitle(title: string, stockSymbols?: string[], isBreaking?: boolean): string {
  let optimizedTitle = title;
  
  // Add breaking news indicator
  if (isBreaking) {
    optimizedTitle = `🚨 BREAKING: ${optimizedTitle}`;
  }
  
  // Add stock symbol if not present and available
  if (stockSymbols && stockSymbols.length > 0) {
    const hasStockInTitle = stockSymbols.some(symbol => 
      title.toUpperCase().includes(symbol.toUpperCase())
    );
    
    if (!hasStockInTitle) {
      const primaryStock = stockSymbols[0];
      optimizedTitle = `${primaryStock} - ${optimizedTitle}`;
    }
  }
  
  // Ensure title doesn't exceed 60 characters for optimal SEO
  if (optimizedTitle.length > 57) {
    optimizedTitle = optimizedTitle.substring(0, 54) + '...';
  }
  
  return optimizedTitle;
}

/**
 * Optimize meta description for Indonesian finance content
 */
function optimizeDescription(
  excerpt: string, 
  stockSymbols?: string[], 
  category?: string
): string {
  let description = excerpt;
  
  // Add stock symbols context
  if (stockSymbols && stockSymbols.length > 0) {
    const stockList = stockSymbols.slice(0, 3).join(', ');
    description = `${description} Analisis saham ${stockList}.`;
  }
  
  // Add sector context
  if (category) {
    const sector = getSectorById(category);
    if (sector) {
      description += ` Berita sektor ${sector.name.toLowerCase()}.`;
    }
  }
  
  // Add call-to-action
  description += ' Baca selengkapnya di Sahamindo.';
  
  // Ensure description is within optimal length
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  }
  
  return description;
}

/**
 * Generate Article JSON-LD structured data
 */
function generateArticleJsonLd(article: CollectionEntry<'news'>): Record<string, any> {
  const { title, excerpt, author, publishDate, category, stockSymbols } = article.data;
  const sector = getSectorById(category);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description: excerpt,
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.companyName,
      url: siteConfig.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.siteUrl}/logo.png`,
        width: 200,
        height: 60
      }
    },
    datePublished: publishDate,
    dateModified: publishDate,
    url: `${siteConfig.siteUrl}/berita/${article.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.siteUrl}/berita/${article.slug}`
    },
    articleSection: sector?.name || 'Finance',
    keywords: generateKeywords(article),
    about: stockSymbols?.map(symbol => ({
      '@type': 'Corporation',
      name: symbol,
      identifier: symbol,
      tickerSymbol: symbol
    })) || [],
    inLanguage: 'id-ID',
    isAccessibleForFree: true,
    genre: 'Finance'
  };
}

/**
 * Generate keywords from article data
 */
function generateKeywords(article: CollectionEntry<'news'>): string[] {
  const keywords = [];
  const { category, stockSymbols, tags } = article.data;
  
  // Add sector keywords
  const sector = getSectorById(category);
  if (sector) {
    keywords.push(sector.name, sector.id);
  }
  
  // Add stock symbols
  if (stockSymbols) {
    keywords.push(...stockSymbols);
    // Add company codes without .JK
    keywords.push(...stockSymbols.map(symbol => symbol.replace('.JK', '')));
  }
  
  // Add tags
  if (tags) {
    keywords.push(...tags);
  }
  
  // Add common finance terms
  keywords.push(
    'saham indonesia',
    'bursa efek',
    'investasi',
    'pasar modal',
    'analisis saham',
    'berita keuangan'
  );
  
  return [...new Set(keywords)]; // Remove duplicates
}

/**
 * Generate breadcrumb JSON-LD
 */
export function generateBreadcrumbJsonLd(breadcrumbs: Array<{name: string, url: string}>): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

/**
 * Generate FAQ JSON-LD for common stock market questions
 */
export function generateFAQJsonLd(): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Bagaimana cara membaca kode saham Indonesia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kode saham Indonesia menggunakan format 4 huruf diikuti .JK, contoh: BBCA.JK untuk Bank Central Asia, TLKM.JK untuk Telkom Indonesia.'
        }
      },
      {
        '@type': 'Question',
        name: 'Apa itu sektor perbankan di bursa saham?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sektor perbankan mencakup bank umum, BPR, dan institusi keuangan yang terdaftar di Bursa Efek Indonesia seperti BBCA.JK, BBRI.JK, BMRI.JK.'
        }
      },
      {
        '@type': 'Question',
        name: 'Kapan waktu terbaik membaca berita saham?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Berita saham sebaiknya dibaca sebelum jam buka pasar (09:00 WIB) dan setelah penutupan (16:00 WIB) untuk analisis pergerakan harga.'
        }
      }
    ]
  };
}

/**
 * Generate organization JSON-LD for Sahamindo
 */
export function generateOrganizationJsonLd(): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.companyName,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/logo.png`,
    description: 'Platform berita dan analisis saham Indonesia terpercaya dengan fokus pada pasar modal dan investasi.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@sahamindo.com',
      availableLanguage: 'Indonesian'
    },
    sameAs: [
      'https://twitter.com/sahamindo',
      'https://linkedin.com/company/sahamindo',
      'https://facebook.com/sahamindo'
    ],
    areaServed: 'Indonesia',
    knowsAbout: [
      'Bursa Efek Indonesia',
      'Saham Indonesia',
      'Analisis Keuangan',
      'Investasi',
      'Pasar Modal'
    ]
  };
}
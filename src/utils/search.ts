/**
 * Search functionality for Sahamindo finance articles
 */

import type { CollectionEntry } from 'astro:content';
import { marketSectors, getSectorById } from '@data/categories';
import { extractStockSymbols } from './stockSymbols';

export interface SearchResult {
    article: CollectionEntry<'news'>;
    score: number;
    matchType: 'title' | 'excerpt' | 'content' | 'stockSymbol' | 'tag';
}

export interface SearchFilters {
    sector?: string;
    stockSymbol?: string;
    dateFrom?: Date;
    dateTo?: Date;
    author?: string;
    isBreaking?: boolean;
}

export interface ArchiveEntry {
    year: number;
    month: number;
    articles: CollectionEntry<'news'>[];
    count: number;
}

/**
 * Search articles with Indonesian finance terms optimization
 */
export function searchArticles(
    articles: CollectionEntry<'news'>[],
    query: string,
    filters: SearchFilters = {}
): SearchResult[] {
    if (!query.trim() && Object.keys(filters).length === 0) {
        return articles.map(article => ({ article, score: 1, matchType: 'content' as const }));
    }

    const normalizedQuery = normalizeIndonesianText(query.toLowerCase());
    const results: SearchResult[] = [];

    for (const article of articles) {
        // Apply filters first
        if (!passesFilters(article, filters)) {
            continue;
        }

        if (!query.trim()) {
            results.push({ article, score: 1, matchType: 'content' });
            continue;
        }

        let score = 0;
        let bestMatchType: SearchResult['matchType'] = 'content';

        // Search in title (highest priority)
        const titleMatch = searchInText(article.data.title, normalizedQuery);
        if (titleMatch.score > 0) {
            score += titleMatch.score * 3;
            bestMatchType = 'title';
        }

        // Search in excerpt
        const excerptMatch = searchInText(article.data.excerpt, normalizedQuery);
        if (excerptMatch.score > 0) {
            score += excerptMatch.score * 2;
            if (bestMatchType === 'content') bestMatchType = 'excerpt';
        }

        // Search in stock symbols
        if (article.data.stockSymbols) {
            const stockMatch = searchInStockSymbols(article.data.stockSymbols, query);
            if (stockMatch > 0) {
                score += stockMatch * 2.5;
                bestMatchType = 'stockSymbol';
            }
        }

        // Search in tags
        if (article.data.tags) {
            const tagMatch = searchInTags(article.data.tags, normalizedQuery);
            if (tagMatch > 0) {
                score += tagMatch * 1.5;
                if (bestMatchType === 'content') bestMatchType = 'tag';
            }
        }

        // Add bonus for sector relevance
        const sectorBonus = getSectorRelevanceBonus(article.data.category, normalizedQuery);
        score += sectorBonus;

        if (score > 0) {
            results.push({ article, score, matchType: bestMatchType });
        }
    }

    // Sort by score (highest first)
    return results.sort((a, b) => b.score - a.score);
}

/**
 * Create archive structure organized by date and sector
 */
export function createArchive(articles: CollectionEntry<'news'>[]): {
    byDate: ArchiveEntry[];
    bySector: Record<string, CollectionEntry<'news'>[]>;
} {
    const byDate: Map<string, CollectionEntry<'news'>[]> = new Map();
    const bySector: Record<string, CollectionEntry<'news'>[]> = {};

    // Initialize sectors
    marketSectors.forEach(sector => {
        bySector[sector.id] = [];
    });

    // Group articles
    articles.forEach(article => {
        const date = new Date(article.data.publishDate);
        const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        // Group by date
        if (!byDate.has(yearMonth)) {
            byDate.set(yearMonth, []);
        }
        byDate.get(yearMonth)!.push(article);

        // Group by sector
        if (bySector[article.data.category]) {
            bySector[article.data.category].push(article);
        }
    });

    // Convert date map to sorted array
    const dateArchive: ArchiveEntry[] = Array.from(byDate.entries())
        .map(([yearMonth, articles]) => {
            const [year, month] = yearMonth.split('-').map(Number);
            return {
                year,
                month,
                articles: articles.sort((a, b) => 
                    new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime()
                ),
                count: articles.length
            };
        })
        .sort((a, b) => {
            if (a.year !== b.year) return b.year - a.year;
            return b.month - a.month;
        });

    return { byDate: dateArchive, bySector };
}

/**
 * Get related articles based on sector and stock symbols
 */
export function getRelatedArticles(
    currentArticle: CollectionEntry<'news'>,
    allArticles: CollectionEntry<'news'>[],
    limit: number = 3
): CollectionEntry<'news'>[] {
    const related: Array<{ article: CollectionEntry<'news'>; score: number }> = [];

    for (const article of allArticles) {
        if (article.id === currentArticle.id) continue;

        let score = 0;

        // Same sector bonus
        if (article.data.category === currentArticle.data.category) {
            score += 3;
        }

        // Shared stock symbols bonus
        if (currentArticle.data.stockSymbols && article.data.stockSymbols) {
            const sharedSymbols = currentArticle.data.stockSymbols.filter(symbol =>
                article.data.stockSymbols!.includes(symbol)
            );
            score += sharedSymbols.length * 2;
        }

        // Shared tags bonus
        if (currentArticle.data.tags && article.data.tags) {
            const sharedTags = currentArticle.data.tags.filter(tag =>
                article.data.tags!.includes(tag)
            );
            score += sharedTags.length * 1;
        }

        // Recent articles bonus
        const daysDiff = Math.abs(
            new Date(currentArticle.data.publishDate).getTime() - 
            new Date(article.data.publishDate).getTime()
        ) / (1000 * 60 * 60 * 24);
        
        if (daysDiff <= 7) score += 1;
        if (daysDiff <= 30) score += 0.5;

        if (score > 0) {
            related.push({ article, score });
        }
    }

    return related
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.article);
}

// Helper functions

/**
 * Normalize Indonesian text for better search
 */
function normalizeIndonesianText(text: string): string {
    return text
        .toLowerCase()
        .replace(/[àáâãäå]/g, 'a')
        .replace(/[èéêë]/g, 'e')
        .replace(/[ìíîï]/g, 'i')
        .replace(/[òóôõö]/g, 'o')
        .replace(/[ùúûü]/g, 'u')
        .replace(/[ñ]/g, 'n')
        .replace(/[ç]/g, 'c')
        .trim();
}

/**
 * Search within text with fuzzy matching
 */
function searchInText(text: string, query: string): { score: number; matches: string[] } {
    const normalizedText = normalizeIndonesianText(text.toLowerCase());
    const queryTerms = query.split(/\s+/).filter(term => term.length > 1);
    
    let score = 0;
    const matches: string[] = [];

    for (const term of queryTerms) {
        if (normalizedText.includes(term)) {
            score += 1;
            matches.push(term);
            
            // Bonus for exact phrase match
            if (normalizedText.includes(query)) {
                score += 0.5;
            }
            
            // Bonus for word boundary match
            const wordBoundaryRegex = new RegExp(`\\b${term}\\b`);
            if (wordBoundaryRegex.test(normalizedText)) {
                score += 0.3;
            }
        }
    }

    return { score, matches };
}

/**
 * Search in stock symbols
 */
function searchInStockSymbols(stockSymbols: string[], query: string): number {
    const normalizedQuery = query.toUpperCase().replace(/\s+/g, '');
    let score = 0;

    for (const symbol of stockSymbols) {
        if (symbol.includes(normalizedQuery)) {
            score += 1;
            // Exact match bonus
            if (symbol === normalizedQuery || symbol === `${normalizedQuery}.JK`) {
                score += 2;
            }
        }
    }

    return score;
}

/**
 * Search in tags
 */
function searchInTags(tags: string[], query: string): number {
    const normalizedQuery = normalizeIndonesianText(query);
    let score = 0;

    for (const tag of tags) {
        const normalizedTag = normalizeIndonesianText(tag);
        if (normalizedTag.includes(normalizedQuery) || normalizedQuery.includes(normalizedTag)) {
            score += 1;
        }
    }

    return score;
}

/**
 * Get sector relevance bonus
 */
function getSectorRelevanceBonus(articleCategory: string, query: string): number {
    const sector = getSectorById(articleCategory);
    if (!sector) return 0;

    const sectorTerms = [
        sector.name.toLowerCase(),
        sector.id.toLowerCase(),
        ...sector.description.toLowerCase().split(/\s+/)
    ];

    for (const term of sectorTerms) {
        if (query.includes(term)) {
            return 0.5;
        }
    }

    return 0;
}

/**
 * Check if article passes filters
 */
function passesFilters(article: CollectionEntry<'news'>, filters: SearchFilters): boolean {
    if (filters.sector && article.data.category !== filters.sector) {
        return false;
    }

    if (filters.stockSymbol && article.data.stockSymbols) {
        const hasSymbol = article.data.stockSymbols.some(symbol =>
            symbol.toUpperCase().includes(filters.stockSymbol!.toUpperCase())
        );
        if (!hasSymbol) return false;
    }

    if (filters.dateFrom) {
        const articleDate = new Date(article.data.publishDate);
        if (articleDate < filters.dateFrom) return false;
    }

    if (filters.dateTo) {
        const articleDate = new Date(article.data.publishDate);
        if (articleDate > filters.dateTo) return false;
    }

    if (filters.author && !article.data.author.toLowerCase().includes(filters.author.toLowerCase())) {
        return false;
    }

    if (filters.isBreaking !== undefined && article.data.isBreaking !== filters.isBreaking) {
        return false;
    }

    return true;
}

/**
 * Get search suggestions based on popular terms
 */
export function getSearchSuggestions(articles: CollectionEntry<'news'>[]): string[] {
    const suggestions = new Set<string>();

    // Add stock symbols
    articles.forEach(article => {
        if (article.data.stockSymbols) {
            article.data.stockSymbols.forEach(symbol => {
                suggestions.add(symbol);
                suggestions.add(symbol.replace('.JK', '')); // Add without .JK
            });
        }
    });

    // Add sector names
    marketSectors.forEach(sector => {
        suggestions.add(sector.name);
        suggestions.add(sector.id);
    });

    // Add common finance terms
    const financeTerms = [
        'laba', 'rugi', 'pendapatan', 'dividen', 'IPO', 'merger', 'akuisisi',
        'saham', 'obligasi', 'emiten', 'bursa', 'indeks', 'volume', 'kapitalisasi'
    ];
    financeTerms.forEach(term => suggestions.add(term));

    return Array.from(suggestions).slice(0, 20);
}
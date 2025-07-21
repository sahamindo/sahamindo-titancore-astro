/**
 * Content validation utilities for Sahamindo finance articles
 */

import { marketSectors } from '@data/categories';
import { isValidStockSymbol } from './stockSymbols';

export interface ArticleMetadata {
    title: string;
    excerpt: string;
    publishDate: string;
    author: string;
    category: string;
    stockSymbols?: string[];
    isBreaking?: boolean;
    publish?: boolean;
    tags?: string[];
}

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}

/**
 * Validate article metadata for content requirements
 */
export function validateArticleMetadata(metadata: ArticleMetadata): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields validation
    if (!metadata.title?.trim()) {
        errors.push('Title is required');
    } else if (metadata.title.length < 10) {
        warnings.push('Title should be at least 10 characters long');
    } else if (metadata.title.length > 80) {
        warnings.push('Title should be less than 80 characters for better SEO');
    }

    if (!metadata.excerpt?.trim()) {
        errors.push('Excerpt is required');
    } else if (metadata.excerpt.length < 50) {
        warnings.push('Excerpt should be at least 50 characters long');
    } else if (metadata.excerpt.length > 160) {
        warnings.push('Excerpt should be less than 160 characters for SEO');
    }

    if (!metadata.publishDate) {
        errors.push('Publish date is required');
    } else if (!isValidDate(metadata.publishDate)) {
        errors.push('Publish date must be in YYYY-MM-DD format');
    }

    if (!metadata.author?.trim()) {
        errors.push('Author is required');
    }

    // Category validation
    if (!metadata.category) {
        errors.push('Category is required');
    } else {
        const validCategories = marketSectors.map(s => s.id);
        if (!validCategories.includes(metadata.category)) {
            errors.push(`Category must be one of: ${validCategories.join(', ')}`);
        }
    }

    // Stock symbols validation
    if (metadata.stockSymbols && metadata.stockSymbols.length > 0) {
        const invalidSymbols = metadata.stockSymbols.filter(symbol => !isValidStockSymbol(symbol));
        if (invalidSymbols.length > 0) {
            errors.push(`Invalid stock symbols: ${invalidSymbols.join(', ')}. Use format: XXXX.JK`);
        }

        if (metadata.stockSymbols.length > 5) {
            warnings.push('Consider limiting stock symbols to 5 or fewer for better readability');
        }
    }

    // Tags validation
    if (metadata.tags && metadata.tags.length > 8) {
        warnings.push('Consider limiting tags to 8 or fewer');
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
}

/**
 * Validate date string format (YYYY-MM-DD)
 */
function isValidDate(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Generate SEO-friendly slug from title
 */
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special chars except spaces and hyphens
        .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
        .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
        .slice(0, 100); // Limit length
}

/**
 * Extract stock symbols from article content
 */
export function extractStockSymbolsFromContent(content: string): string[] {
    const stockPattern = /\b[A-Z]{4}\.JK\b/g;
    const matches = content.match(stockPattern) || [];
    return [...new Set(matches)]; // Remove duplicates
}

/**
 * Validate article content for finance journalism standards
 */
export function validateArticleContent(content: string): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!content?.trim()) {
        errors.push('Article content is required');
        return { isValid: false, errors, warnings };
    }

    // Minimum length check
    if (content.length < 500) {
        warnings.push('Article content should be at least 500 characters for substantial coverage');
    }

    // Check for stock symbols in content
    const stockSymbols = extractStockSymbolsFromContent(content);
    if (stockSymbols.length === 0) {
        warnings.push('Consider including relevant stock symbols (XXXX.JK format) in the content');
    }

    // Check for basic structure elements
    const hasHeadings = /^#{1,3}\s+.+$/m.test(content);
    if (!hasHeadings) {
        warnings.push('Consider adding headings (##, ###) to improve article structure');
    }

    // Check for quotes (journalism standard)
    const hasQuotes = /"[^"]+"/g.test(content) || /"\s*[^"]*\s*"/g.test(content);
    if (!hasQuotes) {
        warnings.push('Consider adding quotes from sources to enhance credibility');
    }

    // Check for financial terms
    const financialTerms = ['triliun', 'miliar', 'juta', 'rp', '%', 'yoy', 'qtq'];
    const hasFinancialData = financialTerms.some(term => 
        content.toLowerCase().includes(term)
    );
    if (!hasFinancialData) {
        warnings.push('Article should include financial data or metrics');
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
}

/**
 * Complete article validation (metadata + content)
 */
export function validateCompleteArticle(
    metadata: ArticleMetadata, 
    content: string
): ValidationResult {
    const metadataResult = validateArticleMetadata(metadata);
    const contentResult = validateArticleContent(content);

    return {
        isValid: metadataResult.isValid && contentResult.isValid,
        errors: [...metadataResult.errors, ...contentResult.errors],
        warnings: [...metadataResult.warnings, ...contentResult.warnings]
    };
}

/**
 * SEO score calculator for articles
 */
export function calculateSEOScore(metadata: ArticleMetadata, content: string): {
    score: number;
    suggestions: string[];
} {
    let score = 0;
    const suggestions: string[] = [];
    const maxScore = 100;

    // Title optimization (20 points)
    if (metadata.title && metadata.title.length >= 50 && metadata.title.length <= 60) {
        score += 20;
    } else {
        suggestions.push('Optimize title length to 50-60 characters for better SEO');
    }

    // Excerpt optimization (15 points)
    if (metadata.excerpt && metadata.excerpt.length >= 120 && metadata.excerpt.length <= 160) {
        score += 15;
    } else {
        suggestions.push('Optimize excerpt length to 120-160 characters');
    }

    // Stock symbols in title (10 points)
    const stockSymbolsInTitle = extractStockSymbolsFromContent(metadata.title || '');
    if (stockSymbolsInTitle.length > 0) {
        score += 10;
    } else if (metadata.stockSymbols && metadata.stockSymbols.length > 0) {
        suggestions.push('Consider including a stock symbol in the title for better SEO');
    }

    // Category relevance (15 points)
    if (metadata.category && marketSectors.find(s => s.id === metadata.category)) {
        score += 15;
    }

    // Content length (20 points)
    if (content.length >= 1000) {
        score += 20;
    } else if (content.length >= 500) {
        score += 10;
        suggestions.push('Consider expanding content to 1000+ characters for better SEO');
    } else {
        suggestions.push('Article content should be at least 1000 characters');
    }

    // Stock symbols in content (10 points)
    const stockSymbolsInContent = extractStockSymbolsFromContent(content);
    if (stockSymbolsInContent.length > 0) {
        score += 10;
    } else {
        suggestions.push('Include relevant stock symbols in content');
    }

    // Headings structure (10 points)
    const hasHeadings = /^#{1,3}\s+.+$/m.test(content);
    if (hasHeadings) {
        score += 10;
    } else {
        suggestions.push('Add headings (##, ###) to improve content structure');
    }

    return {
        score: Math.min(score, maxScore),
        suggestions
    };
}
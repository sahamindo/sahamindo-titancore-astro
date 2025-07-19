# Design Document - Sahamindo Transformation

## Overview

This design document outlines the transformation of the existing Titan Core Astro theme into Sahamindo, a specialized Indonesian stock market and finance news platform. The transformation maintains the high-performance Astro architecture while adapting the content structure, navigation, and visual design to serve Indonesian investors and finance professionals.

The design leverages Astro's content collections system to manage finance news articles with market-specific metadata, implements responsive design for mobile users, and provides a professional interface suitable for financial content consumption.

## Architecture

### Content Architecture

The existing blog-centric content structure will be adapted to support finance news with Indonesian market-specific categorization:

```
src/content/
├── news/              # Finance news articles (replaces blog/)
│   ├── banking/       # Banking sector news
│   ├── ipo/           # IPO news and analysis
│   ├── consumer/      # Consumer goods sector news
│   ├── infrastructure/ # Infrastructure sector news
│   └── images/        # Article images
├── market-data/       # Market analysis content
└── about/            # Company information (adapted)
```

### Navigation Structure

The navigation will be restructured to focus on Indonesian market sectors:

- **Beranda** (Home) - Latest market news
- **Sektor** (Sectors) - Dropdown with:
  - Perbankan (Banking)
  - IPO (Initial Public Offering)
  - Barang Konsumen (Consumer Goods)
  - Infrastruktur (Infrastructure)
- **Analisis** (Analysis) - In-depth market analysis
- **Tentang** (About) - About Sahamindo
- **Kontak** (Contact) - Contact information

### Theme Adaptation

The existing multi-theme system will be simplified to use Indonesian market-appropriate colors:
- Primary theme: Professional blue/green palette suitable for finance
- Maintain existing responsive design system
- Adapt typography for Indonesian language content

## Components and Interfaces

### Core Components Modifications

#### News Article Component (adapted from BlogPost)
```typescript
interface NewsArticle {
  title: string;
  excerpt: string;
  publishDate: Date;
  author: string;
  category: MarketSector;
  stockSymbols?: string[]; // e.g., ["BBCA.JK", "TLKM.JK"]
  featuredImage?: string;
  content: string;
}

type MarketSector = 
  | 'banking' 
  | 'ipo' 
  | 'consumer' 
  | 'infrastructure';
```

#### Stock Symbol Component
A new component to highlight and format Indonesian stock symbols:
```astro
---
interface Props {
  symbol: string; // e.g., "BBCA.JK"
  inline?: boolean;
}
---
```

#### Sector Navigation Component
Replaces the existing category system with Indonesian market sectors:
```astro
---
interface SectorNavProps {
  currentSector?: MarketSector;
  articleCounts: Record<MarketSector, number>;
}
---
```

### Layout Components

#### Homepage Layout
- Hero section with latest breaking news
- Featured articles grid (3-4 recent articles)
- Sector-based content sections
- Market highlights sidebar

#### Article Layout  
- Professional article formatting
- Stock symbol highlighting
- Related articles by sector
- Publication metadata (date, author, sector)

#### Mobile-Optimized Components
- Collapsible navigation menu
- Touch-friendly article cards
- Optimized image loading
- Readable typography scaling

## Data Models

### News Article Schema
```typescript
const newsSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  publishDate: z.date(),
  author: z.string(),
  category: z.enum(['banking', 'ipo', 'consumer', 'infrastructure']),
  stockSymbols: z.array(z.string()).optional(),
  featuredImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isBreaking: z.boolean().default(false)
});
```

### Site Configuration Updates
```typescript
const siteConfig = {
  name: "Sahamindo",
  description: "Portal berita dan analisis pasar saham Indonesia",
  url: "https://sahamindo.com",
  language: "id-ID",
  locale: "id",
  marketFocus: "Indonesia",
  sectors: [
    { id: 'banking', name: 'Perbankan', slug: 'perbankan' },
    { id: 'ipo', name: 'IPO', slug: 'ipo' },
    { id: 'consumer', name: 'Barang Konsumen', slug: 'barang-konsumen' },
    { id: 'infrastructure', name: 'Infrastruktur', slug: 'infrastruktur' }
  ]
};
```

## Error Handling

### Content Validation
- Validate stock symbol format (e.g., XXXX.JK pattern)
- Ensure required article metadata is present
- Handle missing or invalid sector categories gracefully

### User Experience
- Display appropriate messages for empty categories
- Handle mobile navigation errors gracefully  
- Provide fallback content for missing images
- Implement proper 404 handling for invalid sector URLs

### Performance Considerations
- Lazy load article images on mobile
- Implement proper caching for sector-based content
- Optimize Indonesian language font loading
- Maintain existing Astro performance optimizations

## Testing Strategy

### Content Testing
- Validate news article schema compliance
- Test stock symbol formatting and highlighting
- Verify sector-based content filtering
- Test Indonesian language content rendering

### Responsive Testing
- Mobile navigation functionality
- Article readability on various screen sizes
- Touch interaction testing
- Image optimization verification

### Performance Testing
- Page load times with Indonesian content
- Mobile performance optimization
- SEO validation for Indonesian market terms
- Accessibility compliance testing

### User Acceptance Testing
- Indonesian investor user journey testing
- Content editor workflow validation
- Mobile user experience testing
- Professional appearance verification

## Implementation Considerations

### Localization
- All UI text will be in Indonesian (Bahasa Indonesia)
- Date formatting will follow Indonesian conventions
- Currency formatting for IDR (Indonesian Rupiah)
- Time zone handling for Indonesian market hours

### SEO Optimization
- Indonesian language meta tags and descriptions
- Market sector-based URL structure
- Stock symbol-rich content optimization
- Local search optimization for Indonesian finance terms

### Content Management
- Streamlined workflow for finance news publishing
- Stock symbol auto-completion and validation
- Sector categorization enforcement
- Breaking news highlighting system

### Migration Strategy
- Content migration from existing blog structure
- Theme asset updates for finance focus
- Navigation structure implementation
- URL structure changes with proper redirects

This design maintains the robust Astro architecture while transforming the site into a professional Indonesian finance news platform that serves the specific needs of local investors and finance professionals.
# Project Structure & Organization

## Directory Layout
```
src/
├── assets/           # Static assets (images, SVGs)
├── components/       # Reusable UI components
│   ├── blog/         # Blog-specific components
│   ├── forms/        # Form components
│   ├── icons/        # Icon components
│   ├── sections/     # Page section components
│   ├── team/         # Team-related components
│   └── ui/           # Basic UI components
├── content/          # Content collections (Markdown)
│   ├── blog/         # Blog posts
│   ├── legal/        # Legal pages
│   └── team/         # Team member profiles
├── data/             # Configuration and static data
├── layouts/          # Page layout templates
├── pages/            # File-based routing
├── styles/           # Global CSS and theming
└── utils/            # Utility functions
```

## Component Organization
- **UI Components** (`src/components/ui/`) - Basic reusable elements (Button, Input, etc.)
- **Section Components** (`src/components/sections/`) - Page sections (Hero, Features, etc.)
- **Specialized Components** - Domain-specific components in dedicated folders

## Content Collections
- **Blog** - Markdown files with frontmatter (title, excerpt, categories, publishDate)
- **Team** - Team member profiles with social links and job titles
- **Legal** - Legal documents with lastUpdated timestamps

## Configuration Files
- `src/data/config.ts` - Site-wide configuration (company info, SEO, theme)
- `src/data/menu.ts` - Navigation structure
- `src/data/categories.ts` - Blog categories
- `src/content.config.ts` - Content collection schemas

## Path Aliases (tsconfig.json)
```typescript
"@components/*": ["./src/components/*"]
"@layouts/*": ["./src/layouts/*"]
"@styles/*": ["./src/styles/*"]
"@data/*": ["./src/data/*"]
"@utils/*": ["./src/utils/*"]
"@assets/*": ["./src/assets/*"]
```

## Naming Conventions
- **Components** - PascalCase (e.g., `Hero.astro`, `BlogPost.astro`)
- **Files** - kebab-case for content, camelCase for config
- **Directories** - lowercase with hyphens where needed
- **CSS Classes** - Tailwind utility classes + custom CSS variables

## Theme System
- CSS custom properties in `src/styles/global.css`
- Theme variants defined with `[data-theme='themeName']` selectors
- Theme switching via `data-theme` attribute on body element
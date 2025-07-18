# Technology Stack

## Framework & Build System
- **Astro 5.5.3** - Static site generator with component islands
- **Node.js** with ES modules (`"type": "module"`)
- **TypeScript** with strict configuration
- **Bun** for package management (bun.lock present)

## Styling & UI
- **Tailwind CSS 4.0** via Vite plugin
- **Custom CSS variables** for theming system
- **AOS (Animate On Scroll)** for animations
- **Lucide Astro** for icons
- **Bruno Ace SC** and **Noto Sans KR** fonts

## Content Management
- **Astro Content Collections** for structured content
- **Zod schemas** for content validation
- **Markdown** for blog posts and content pages
- **Image optimization** with Astro's built-in Image component

## Development Tools
- **Prettier** for code formatting with Astro plugin
- **Astro Check** for TypeScript validation
- **Sitemap generation** via @astrojs/sitemap

## Common Commands
```bash
# Development
npm run dev          # Start dev server at localhost:4321
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run format       # Format code with Prettier
npm run check        # Run Astro TypeScript checks

# Package Management
bun install          # Install dependencies (preferred)
npm install          # Alternative package installation
```

## Key Dependencies
- `aos` - Animation library
- `@astrojs/sitemap` - SEO sitemap generation
- `@tailwindcss/vite` - Tailwind CSS integration
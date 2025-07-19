# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev          # Start dev server at localhost:4321
npm run build        # Build for production to ./dist/
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run format       # Format code with Prettier
npm run check        # Run Astro TypeScript validation
```

Note: This project uses both npm and Bun. Bun is preferred for package installation:
```bash
bun install          # Preferred for installing dependencies
npm install          # Alternative if Bun is not available
```

## Architecture

### Component-Based Structure
The project follows a modular component architecture with clear separation of concerns:

- **Components** (`src/components/`): Reusable UI components organized by function
  - `blog/`: Blog listing, post cards, category pills
  - `forms/`: Contact and input forms
  - `icons/`: Icon components from Lucide
  - `sections/`: Page sections (Hero, Features, CTAs, etc.)
  - `team/`: Team member displays
  - `ui/`: Base UI components (buttons, cards, etc.)

- **Content Collections** (`src/content/`): Structured content with Zod validation
  - `blog`: Blog posts with categories, SEO metadata
  - `team`: Team profiles with social links
  - `legal`: Legal documents (privacy, terms)

- **Layouts** (`src/layouts/`): Page templates that include header/footer
  - Main layout includes theme support and AOS animations
  - Blog-specific layouts for posts and listings

### Theming System
The project uses a CSS variable-based theming system with 10 pre-configured themes. Theme is set in `src/data/config.ts`:
```typescript
export const themeSetting = {
  theme: 'zeus' // Choose from: zeus, poseidon, hades, apollo, artemis, ares, athena, hermes, dionysus, demeter
}
```

### Path Aliases
TypeScript path aliases are configured for cleaner imports:
- `@components/*` → `./src/components/*`
- `@layouts/*` → `./src/layouts/*`
- `@data/*` → `./src/data/*`
- `@utils/*` → `./src/utils/*`
- `@assets/*` → `./src/assets/*`

### Key Configuration Files
- `src/data/config.ts`: Site-wide configuration, company info, SEO defaults
- `src/data/menu.ts`: Navigation structure
- `src/data/features.ts`: Feature section content
- `src/data/categories.ts`: Blog categories
- `astro.config.mjs`: Astro build configuration with Tailwind and sitemap

### Styling Approach
- Tailwind CSS 4.0 via Vite plugin
- AOS (Animate On Scroll) for animations
- Custom CSS variables for theming
- Mobile-first responsive design

### Performance Considerations
- Static site generation for optimal performance
- Image optimization through Astro's Image component
- Remote image support configured for any HTTPS/HTTP source
- Sitemap generation for SEO

### Current Transformation
The project is being transformed into "Sahamindo" - an Indonesian stock market and finance news platform. Transformation specs are in `.kiro/specs/` with detailed requirements for finance-specific features.
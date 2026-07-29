# Next.js migration (MVP)

This folder contains a minimal Next.js TypeScript + Tailwind scaffold to migrate the existing Jekyll site into a static Next.js site ready for export to GitHub Pages.

Quick start:

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

3. Build and export static site

```bash
npm run build
npm run export
```

Notes:
- Posts are read directly from the existing `_posts/` directory to simplify migration.
- To enable Google Analytics, set `NEXT_PUBLIC_GA_ID` in your environment.
- For GitHub Pages, run `next build && next export` and publish the `out/` directory to the pages branch.

# Repository Guidelines

## Project Structure & Module Organization

This is a statically exported Next.js 16 site. App Router pages and metadata routes live in `app/`; feature pages use folders such as `app/news/`. Shared React components belong in `components/`. `data/movie.json` is the single source of truth for film details and news; do not duplicate it in components. Update automation, tests, and fixtures live in `scripts/`. Generated `.next/` and `out/` directories must not be committed.

## Build, Test, and Development Commands

- `npm install` installs the locked dependency set from `package-lock.json`.
- `npm run dev` starts the local Next.js development server.
- `npm run build` creates the production static export in `out/`.
- `npm run lint` runs the Next.js ESLint configuration.
- `npm run typecheck` checks JavaScript/JSX imports and framework types with TypeScript.
- `npm run test:update-data` runs the Node.js test suite for data refresh behavior.
- `npm run update-data` refreshes `data/movie.json`; review all resulting source and date changes before committing.

Before submitting a change, run `npm run test:update-data && npm run typecheck && npm run lint && npm run build`.

## Coding Style & Naming Conventions

Use ES modules, two-space indentation, double quotes, and semicolons. Name React components in PascalCase (`SiteHeader.jsx`) and routes or utilities in lowercase (`app/news/page.jsx`). Prefer server components unless browser state or effects require `"use client"`. Reuse existing components and CSS utilities before adding abstractions or dependencies. Keep canonical URLs based on `SITE_URL`.

## Testing Guidelines

Tests use the built-in `node:test` runner and strict assertions. Name tests `*.test.js` and keep external-search inputs reproducible with fixtures rather than live network calls. There is no numeric coverage threshold; changes to update logic must cover accepted data, rejected data, and preservation of existing values.

## Commit & Pull Request Guidelines

Follow the repository's Lore-style history: start with an imperative, intent-focused subject, explain rationale in the body, then add useful trailers such as `Constraint:`, `Rejected:`, `Confidence:`, `Scope-risk:`, `Tested:`, and `Not-tested:`. Pull requests should summarize user-visible behavior, list verification commands, link related issues, and include desktop/mobile screenshots for visual changes. Call out data-source, canonical-domain, deployment, or indexing risks explicitly.

## Security & Configuration

Never commit `.env*`, Vercel tokens, or generated deployment state. Keep secrets in local environment files or repository secrets, and preserve the static-export deployment model unless a change explicitly requires server-side behavior.

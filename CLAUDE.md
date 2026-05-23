# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint     # run ESLint
```

No test suite is configured yet.

## Context files
Read the following files to get the full context of the project 
@context/project-overview.md
@context/coding-standards.md
@context/ai-interaction.md
@context/current-feature.md

## Stack

- **Next.js 16.2.4** with App Router (`src/app/`) — see AGENTS.md for version caveat
- **React 19.2.4**
- **TypeScript**
- **Tailwind CSS v4** (configured via `postcss.config.mjs`; imported with `@import "tailwindcss"` in `globals.css`)
- **ESLint** with `next/core-web-vitals` + `next/typescript` presets

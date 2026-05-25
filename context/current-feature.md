# Current Feature

Dashboard UI — Phase 1

## Status

Complete

## Goals

Build the core dashboard layout and UI shell. No real data yet — use mock data.

- [x] App shell: top navbar with logo, search bar, and user avatar
- [x] Collapsible sidebar with: item type filters (Snippet, Prompt, Note, Command, File, Image, URL), collections list, and favorites section
- [x] Main workspace: grid/list toggle view of item cards
- [x] Item card component showing title, type badge, tags, and timestamp
- [x] Empty state for when no items exist
- [x] Dark mode as default (already set up via Tailwind v4)
- [x] Mobile-responsive: sidebar becomes a drawer on small screens

## Notes

- Reference screenshots in `context/screenshots/` for layout direction — not pixel-perfect, just directional
- Use shadcn/ui components where available
- Wire up mock data from `context/` folder; no API calls yet
- Keep sidebar collapsible state in local component state (no global store needed yet)
- Item cards are display-only in this phase — no click-through required

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- Dashboard UI Phase 1: navbar, collapsible sidebar with type filters + collections, collections grid, pinned items list, ItemCard (grid/list), EmptyState, grid/list toggle wired to sidebar type filter

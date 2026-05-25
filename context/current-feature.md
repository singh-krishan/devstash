# Current Feature

Dashboard UI — Phase 3

## Status

Complete

## Goals

Enhance the main dashboard area with stats, recent items, and a polished layout.

- [x] 4 stats cards: total items, total collections, favorite items, favorite collections
- [x] Recent collections section
- [x] Pinned items section
- [x] 10 most recent items section

## Notes

- Stats use aggregated counts from `mockTypeCounts` and `mockCollections`/`mockItems`
- Recent items = top 10 sorted by `updatedAt` descending
- Reference `context/screenshots/dashboard-ui-main.png` for layout direction
- See `context/features/dashboard-phase-3-spec.md` for spec

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- Dashboard UI Phase 1: navbar, collapsible sidebar with type filters + collections, collections grid, pinned items list, ItemCard (grid/list), EmptyState, grid/list toggle wired to sidebar type filter
- Dashboard UI Phase 2: collapsible sidebar (icon-only mode on desktop), type items as Next.js Links to /items/[type], Favorites + Recent collection sections, DashboardLayout shared shell, /items/[type] route with grid/list toggle
- Dashboard UI Phase 3: 4 stats cards (total items, collections, favorites), recent collections grid, pinned items, 10 recent items list, StatsCard component

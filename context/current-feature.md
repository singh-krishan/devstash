# Current Feature

Dashboard UI — Phase 2

## Status

Complete

## Goals

Enhance the sidebar with collapsible behavior, navigation links, favorites/recent collections, user avatar area, and drawer support on mobile.

- [x] Collapsible sidebar (expand/collapse toggle)
- [x] Item type links navigating to `/items/TYPE` (e.g. `/items/snippets`)
- [x] Favorite collections section in sidebar
- [x] Most recent collections section in sidebar
- [x] User avatar area at the bottom of the sidebar
- [x] Drawer icon to open/close sidebar
- [x] Always a drawer on mobile view

## Notes

- Reference `context/screenshots/dashboard-ui-main.png` and `dashboard-ui-drawer.png` for layout direction
- Use mock data from `src/lib/mock-data.ts` — import directly, no API calls yet
- See `context/features/dashboard-phase-1-spec.md` for prior work context
- See `context/features/dashboard-phase-3-spec.md` for upcoming work

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- Dashboard UI Phase 1: navbar, collapsible sidebar with type filters + collections, collections grid, pinned items list, ItemCard (grid/list), EmptyState, grid/list toggle wired to sidebar type filter
- Dashboard UI Phase 2: collapsible sidebar (icon-only mode on desktop), type items as Next.js Links to /items/[type], Favorites + Recent collection sections, DashboardLayout shared shell, /items/[type] route with grid/list toggle

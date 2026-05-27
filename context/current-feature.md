# Current Feature

Database Setup — Prisma + Neon PostgreSQL

## Status

Complete

## Goals

Set up Prisma ORM with Neon PostgreSQL (serverless) as the database layer.

- [x] Install Prisma 7 and `@prisma/client`
- [x] Configure Neon PostgreSQL connection (DATABASE_URL for dev branch)
- [x] Create initial Prisma schema from data models in `context/project-overview.md`
- [x] Include NextAuth models (Account, Session, VerificationToken)
- [x] Add indexes and cascade deletes where appropriate
- [ ] Run initial migration with `prisma migrate dev` — requires real DATABASE_URL in `.env`

## Notes

- Always use `prisma migrate dev` — never `db push` unless specified
- DATABASE_URL points to the **development** Neon branch; production uses a separate branch
- Prisma 7 has breaking changes — read upgrade guide before writing any code
- Schema will evolve; this is the initial setup only

## References

- `context/features/database-spec.md`
- `context/project-overview.md` (Prisma schema draft)
- `context/coding-standards.md`

---

# Previous Feature

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
- Database Setup: Prisma 7 + Neon PostgreSQL, full schema (User, Item, ItemType, Collection, Tag, ItemTag + NextAuth models), prisma.config.ts, db.ts singleton, postinstall generate script

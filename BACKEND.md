# Dolphin Immigration — Backend & CMS

Full-stack on **Next.js 14 (App Router) + PostgreSQL + Prisma**. Everything runs inside the one Next.js app (no separate server).

## What's included
- **CMS (edit everything)** — `/admin/content`: logo, menu, all headings & text (Vietnamese + English) via one structured editor. Content is stored as a JSON tree in the DB; the public site reads from it (falls back to bundled defaults if the DB is empty).
- **Admin account** — seeded from `.env` (`info@dolphinimmigration.co.nz`). Login at `/admin/login`. Change password in `/admin/account`. Forgot-password sends a reset link by email.
- **Contact form** — `POST /api/contact` emails `MAIL_TO` **and** always saves the lead to the DB (view in `/admin/leads`), so no enquiry is lost if email fails.
- **INZ news sync** — `/admin/news` → “Đồng bộ từ INZ” pulls the latest Immigration NZ news-centre articles, saved as **pending** for review; publish to show them on the Home hero + News page.

## Setup (on your server / local with Node 18+)
```bash
cp .env.example .env         # then fill DATABASE_URL, AUTH_SECRET, SMTP_*, APP_URL
npm install
npx prisma migrate deploy    # or: npx prisma migrate dev  (first time, creates migration)
npm run db:seed              # creates admin + default content + starter news
npm run dev                  # http://localhost:3000  (admin at /admin)
```
Production: `npm run build && npm start`.

## Environment (.env)
See `.env.example`. Key values:
- `DATABASE_URL` — your PostgreSQL connection string.
- `AUTH_SECRET` — long random string (signs admin sessions).
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — seed admin. **Change the password after first login.**
- `SMTP_*` / `MAIL_FROM` / `MAIL_TO` — email. Leave blank to disable sending; leads are still saved to the DB.
- `APP_URL` — used to build password-reset links.
- `INZ_SITEMAP_URL` / `INZ_NEWS_PREFIX` — INZ news source (defaults provided).

## How content editing works
`lib/content.ts` holds `defaultContent` (the whole site). On first `db:seed` it is copied into the `SiteContent` row. The admin editor loads that JSON, lets you edit every string, and saves it back. Public pages call `getContent()` (server) which deep-merges DB overrides over defaults — so new fields added in code still appear even before re-seeding.

## Data model (Prisma)
`Admin`, `PasswordResetToken`, `SiteContent` (JSON tree), `NewsItem` (bilingual, `published` flag, `source` = manual/inz), `Lead`.

## Notes
- Admin routes are protected by `middleware.ts` (cookie check) + server-side session verification in the panel layout.
- The INZ scraper parses public news pages; if INZ changes its HTML the parser may need updating. Synced items always start unpublished for review, and every news card links back to the INZ source.
- Optional: schedule `POST /api/admin/news/sync` (e.g. a daily cron) to auto-pull news; it still requires an admin session, so for automation add a cron token if desired.

## Troubleshooting — can't log in
The seed runs via `tsx`, which does not auto-load `.env`. If the admin ended up with unexpected credentials (or wasn't created), reset it:
```bash
npm run admin:reset     # sets the admin to ADMIN_EMAIL / ADMIN_PASSWORD from .env
```
Then log in at `/admin/login` with those exact values. Notes:
- The scripts now load `.env` automatically (via `prisma/_env.ts`), so make sure `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` are set in `.env`.
- `db:seed` will not overwrite an existing admin's password; use `admin:reset` to force it.
- Email is matched case-insensitively.

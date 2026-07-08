# Dolphin Immigration — Website + CMS

Rebuild of dolphinimmigration.co.nz on **Next.js 14 (App Router) + TypeScript + Tailwind + PostgreSQL/Prisma**.
Bilingual **Vietnamese / English**, purple brand, with a full admin CMS.

## Quick start
```bash
cp .env.example .env      # fill DATABASE_URL, AUTH_SECRET, SMTP_*, APP_URL
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev               # http://localhost:3000  ·  admin: /admin
```

## Structure
- `app/(site)/` — public pages (Home, About+Team, NZ/AU visas, News, Contact)
- `app/(admin)/admin/` — CMS (login, dashboard, content editor, news, leads, account)
- `app/api/` — contact + admin API routes
- `lib/content.ts` — full editable content tree (defaults) · `lib/pages.ts` — visa page content
- `lib/get-content.ts` — server loader (DB → defaults) · `lib/site.tsx` — `useSite()` provider
- `lib/auth.ts` / `lib/password.ts` — sessions & hashing · `lib/mailer.ts` — SMTP · `lib/inz.ts` — INZ news sync
- `prisma/schema.prisma` · `prisma/seed.ts`

## Features
- Public site: visa tabs (NZ/Úc), employer services (Accredited Employer + Job Check), immigration news, brand story/About+Team.
- CMS: edit logo, menu, and all text (VI/EN); manage & sync INZ news; view contact leads; account/password.

See **BACKEND.md** for full backend setup and details.

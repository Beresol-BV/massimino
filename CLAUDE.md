# CLAUDE.md - Massimino Project Guidelines

## Project Overview

Massimino is an open-source fitness application built with Next.js that includes workout logging, training programmes, nutrition coaching and exercise databases.

## Contribution rules

- **Never commit or push to `main`.** Every change goes on its own branch and reaches `main` through a pull request. See `CONTRIBUTING.md`.
- **Never commit secrets, personal data or material without redistribution rights.** New environment variables go in `.env.example` with an empty value.

---

## Design System

### Responsive Design

Massimino **must be fully responsive** across all screen sizes: smartphone (sm: 640px), tablet (md: 768px), laptop (lg: 1024px), desktop (xl: 1280px), and large desktop (2xl: 1536px). All layouts, components, and pages must adapt gracefully from mobile-first upward.

### Brand Colors

- **Primary (petrol):** `#2B5069` — headings, buttons, links, shadcn `--primary`. Hover: `#1E3D52` (`--primary-hover`, Tailwind `bg-primary-hover`)
- **Background (cream):** `#FBF8F2` — page background (`--background`, Tailwind `brand-secondary`)
- **Cards (warm white):** `#FFFDF8` — cards and surfaces (`--card`). Tailwind `white` is remapped to this value, so `bg-white` is warm white too
- **No electric blue.** Tailwind's `blue-*` scale is remapped to a petrol scale in `tailwind.config.js` (`blue-600` = `#2B5069`). Purple/violet/indigo are untouched
- Change colours through the CSS variables in `src/app/globals.css` and `tailwind.config.js`, not with hex values in components. Never write `bg-[#fcfaf5]`; use `bg-brand-secondary`
- Text must pass WCAG AA (4.5:1) on cream. `text-gray-400` does not (2.4:1): use `text-gray-500` or darker for readable text

### Typography

- **Primary font:** Nunito Sans (`font-family: "Nunito Sans", sans-serif`)
- **Secondary font:** Lato (`font-family: "Lato", sans-serif`)
- Self-hosted with `next/font/google` in `src/app/layout.tsx` (CSS variables `--font-nunito-sans`, `--font-lato`, used by the Tailwind `font-sans`, `font-display` and `font-body` families). Never add a Google Fonts `<link>`: the CSP blocks it and it sends visitor IPs to Google.
- Nunito Sans variable settings: `font-variation-settings: "wdth" 100, "YTLC" 500;`

---

## Project-Specific Rules

### Code Style

- Use TypeScript for all new code
- Follow existing component patterns in `src/components/`
- Use Tailwind CSS for styling
- Prefer server components where possible (Next.js App Router)

### Database

- PostgreSQL is the primary database, accessed through Prisma (`prisma/schema.prisma`, client from `@/core/database`)
- Set up a local database with `npx prisma db push`: the committed migrations do not yet cover the full schema
- Programme templates are JSON in `src/templates/`
- Server-only knowledge is in `data/knowledge/`, read at runtime by Massichat and workout suggestions. Never put it in `public/`
- Licensed source documents and personal files go in `data/private/` (gitignored, local only). Nothing private ever goes in `public/`, which is served to anyone

### Known Issues to Avoid

1. **Navigation Bug**: "Back to Programs" sometimes returns to "Today" tab instead of "Programs" tab
2. **Exercise Media**: Several programs lack exercise media/demonstrations. ExerciseDB CDN (`static.exercisedb.dev`) is unreliable — prefer self-hosted images in `public/`.
3. **Missing Exercises**: Some programs reference exercises not in the database

### UI feedback

- Never use `window.alert()` or `window.confirm()`: they block the page (and browser automation). Use `notify(message)` and `await confirmAction(message)` from `@/lib/notify`, rendered by `<NotifyHost />` in the root layout.

### API Endpoints

- All API routes are in `src/app/api/`
- Authentication via NextAuth: `getServerSession(authOptions)` with `authOptions` from `@/core`. New routes should use `withAuth` / `ok` / `fail` from `@/lib/api`

### Testing

- Run `npm run type-check` and `npm run build` to check for TypeScript errors
- Test mobile view for all UI changes
- Verify exercise media loads correctly

---

## Corrections Log

*Document every correction here so it doesn't happen again*

### Next.js 14 dev server 500/404 crash loop
- **What went wrong:** `next dev` never creates `.next/server/` on disk, so `getMiddlewareManifest()` crashes with `MODULE_NOT_FOUND`. After `_not-found` compiles, every page returns 500 or 404 in an infinite error loop.
- **Root cause:** Next.js 14.2.35 compiles pages in-memory but `getMiddlewareManifest()` does a hard `require()` against the filesystem.
- **Fix:** `scripts/patch-next-server.js` wraps the `require()` in try/catch, applied automatically via `postinstall`. Also added `src/app/not-found.tsx` so the App Router handles 404s instead of the Pages Router fallback.
- **NEVER** delete `scripts/patch-next-server.js` or remove it from `postinstall`. This patch is required until Next.js is upgraded to 15+.
- Do NOT `rm -rf node_modules` without running `npm install` afterward (which re-applies the patch).

### Stale node process causes persistent 404
- **What went wrong:** After killing/restarting the dev server, the old `node` process stayed alive on port 3000. The new `next dev` silently fell back to port 3001. Hitting `localhost:3000` hit the zombie process which returned 404.
- **Symptoms:** `curl localhost:3000/` returns 404 with Pages Router error page (`"page":"/_error"`), even though App Router files exist.
- **Fix:** Always kill the old process first: `lsof -i :3000 -t | xargs kill -9`, then `rm -rf .next && npx next dev`. Check the server output to confirm it started on port 3000, not 3001.
- **Rule:** When diagnosing 404s, FIRST check `lsof -i :3000` to see if a stale process is occupying the port.

### ExerciseDB CDN media is dead (404)
- **What went wrong:** `static.exercisedb.dev` returns HTTP 404 for many GIF URLs stored in `exercise_media` rows.
- **Fix:** For any future media, prefer self-hosted images in `public/` over external CDN URLs.

### Bio share links pointed at a dead host
- **Fix:** All bio URLs go through `bioProfileUrl()` in `src/lib/bio-url.ts`.
- **Rule:** Never hardcode a public URL for a host you have not curled. Third-party scripts go in `src/components/layout/consent_gated_scripts.tsx`, never straight into `src/app/layout.tsx`.

---

## Key Features Implemented

### Profile Preview ("Preview your public profile as")
- **API:** `GET /api/users/[userId]/public?previewAs=anonymous|athlete|trainer` — owner-only param that overrides viewer context
- **Component:** `src/components/profile/ProfilePreviewDialog.tsx` — Dialog wrapper using `UserPublicProfile` with `previewAs` prop
- **Flow:** ProfileHeader dropdown → sets state in `profile/page.tsx` → opens ProfilePreviewDialog → UserPublicProfile fetches with `previewAs` query param → API simulates viewer context
- **Security:** `previewAs` ignored unless `viewerId === userId`; synthetic IDs (`preview-athlete`, `preview-trainer`) can't match real users

### Profile Media
- Media stored in `exercise_media` table (Prisma), served via public profile API `?include=media`
- Profile page Media tab (`activeTab === 'media'`) fetches real media via `/api/users/{id}/public?include=media`

---

## Architecture Summary

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                        │
├─────────────────────────────────────────────────────────────┤
│  /app                                                        │
│  ├── /api          - API routes (database, external APIs)   │
│  ├── /workout-log  - Workout logging features               │
│  ├── /profile      - User profile management                │
│  └── /massiminos   - Core app features                      │
├─────────────────────────────────────────────────────────────┤
│  /components       - Reusable React components              │
│  │  ├── /profile   - ProfileHeader, ProfilePreviewDialog    │
│  │  └── /layout    - UserPublicProfile (public profile view)│
│  /lib              - Utilities, Supabase client, helpers    │
│  /data/knowledge   - Server-only knowledge files            │
└─────────────────────────────────────────────────────────────┘
```

---

## Verification Checklist

Before shipping any change:

- [ ] TypeScript builds without errors (`npm run type-check`, `npm run build`)
- [ ] UI works on mobile viewport
- [ ] No console errors in browser
- [ ] Navigation flows work correctly
- [ ] Database operations handle errors gracefully

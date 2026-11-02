# Massimino

[![CI](https://github.com/Beresol-BV/massimino/actions/workflows/ci.yml/badge.svg)](https://github.com/Beresol-BV/massimino/actions/workflows/ci.yml)
[![Licence: Apache-2.0](https://img.shields.io/badge/licence-Apache--2.0-2b5069.svg)](LICENSE)

Open-source fitness and wellness platform, backend and frontend. It powers [massimino.fitness](https://massimino.fitness), a community for athletes and personal trainers built around safe, respectful training.

You are welcome to run it, build on it and improve it. Contributions go through branches and pull requests: see [CONTRIBUTING.md](CONTRIBUTING.md).

## What's in it

- **Workout logging:** sessions, sets, personal records and history
- **Training programmes:** a catalogue of templates, with subscriptions and progress tracking
- **Exercise library:** searchable exercises with images and media
- **Massichat:** an AI fitness coach, with your choice of OpenAI or Mistral
- **Trainers and teams:** public profiles, coach and athlete management, invitations and challenges
- **Assessments and nutrition:** posture, cardio and readiness forms, plus nutrition tools
- **Safety tools:** content moderation and reporting
- **Account controls:** data export and account deletion
- **Admin area:** users, moderation, partnerships and analytics

## Tech stack

Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Prisma with PostgreSQL, and NextAuth.

## Getting started

You need Node.js 18.17 or newer (below 25) and a PostgreSQL database.

```bash
git clone https://github.com/Beresol-BV/massimino.git
cd massimino
npm ci

cp .env.example .env
# In .env, set DATABASE_URL and NEXTAUTH_SECRET (openssl rand -base64 32)

npx prisma db push           # creates the tables
npm run db:seed              # adds sample exercises and demo accounts
npm run db:seed:programmes   # fills the training programme catalogue
npm run dev                  # http://localhost:3000
```

Create a user through the sign-up page and sign in with your email and password. To make yourself an admin, add your address to `ADMIN_EMAILS` in `.env` before signing in.

### Load the full exercise library (optional)

The seed adds a small starter set. This imports about 870 exercises from the public-domain [free-exercise-db](https://github.com/yuhonas/free-exercise-db):

```bash
npx ts-node scripts/import-free-exercise-db.ts
```

### Optional features

The app runs with only the required settings at the top of `.env.example`. Each of these needs its own keys, all listed in [`.env.example`](.env.example):

| Feature | Variables |
| --- | --- |
| Massichat and AI suggestions | `OPENAI_API_KEY` or `MISTRAL_API_KEY` |
| Google and social sign-in | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` and others |
| Email | `RESEND_API_KEY` or `SMTP_*` |
| File storage | `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` |
| Payments | `MOLLIE_API_KEY`, `STRIPE_*` |

### Useful commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run type-check` | Check TypeScript types |
| `npm run build` | Build for production |
| `npm run db:studio` | Browse the database |

## Project layout

```
src/app          Pages and API routes (App Router)
src/components   React components
src/services     Business logic
src/core         Auth, database and integrations
src/templates    Training programme templates (JSON)
prisma           Database schema, migrations and seeds
data/knowledge   Server-only knowledge files for the AI features
public           Static files, served to anyone
```

`CLAUDE.md` holds the project's design and coding rules.

## What this repository doesn't include

This is the application code, published from the main project as a fresh start. It doesn't include:

- **Secrets or production data:** you bring your own keys and your own database
- **Licensed course material:** the hosted service draws on licensed text that can't be redistributed, so the AI features have less to draw on here (see [`data/knowledge/README.md`](data/knowledge/README.md))
- **Partner logos and personal photos:** these are flat-colour images marked "Placeholder"

## Known limitations

- There's no automated test suite yet, so CI checks types and the build. Tests are a great first contribution.
- The committed migrations don't cover the full schema, so use `prisma db push` for local databases.
- A few programme cards point to images that don't exist yet.

## Contributing

Everyone works on a branch, and `main` only changes through pull requests. [CONTRIBUTING.md](CONTRIBUTING.md) explains how. Please report security problems privately, as described in [SECURITY.md](SECURITY.md).

## Licence

The code is licensed under the [Apache License 2.0](LICENSE). The Massimino and Beresol names and logos, and some third-party media, aren't covered: see [NOTICE](NOTICE). If you run a public fork, please use your own branding and legal pages.

Massimino offers general fitness information and isn't medical advice.

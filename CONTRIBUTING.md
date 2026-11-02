# Contributing to Massimino

Thanks for helping. Massimino welcomes bug fixes, new features, documentation and design work.

## The one rule: work on a branch

**Nobody commits directly to `main`, including maintainers.** Every change goes on its own branch and reaches `main` through a pull request. GitHub enforces this: direct pushes, force pushes and deleting `main` are all rejected. A pull request needs a passing CI check and one approving review before it can merge.

### If you don't have write access (most contributors)

1. [Fork the repository](https://github.com/Beresol-BV/massimino/fork).
2. Create a branch in your fork:
   ```bash
   git switch -c fix/back-to-programs-tab
   ```
3. Commit, push to your fork, and open a pull request against `Beresol-BV/massimino:main`.

### If you have write access

Create the branch in this repository, then open a pull request:

```bash
git switch main && git pull
git switch -c feat/your-change
git push -u origin feat/your-change
```

### Branch names

Use a prefix and a short description: `feat/`, `fix/`, `docs/`, `refactor/` or `chore/`. For example, `feat/rest-timer` or `fix/mobile-nav-overlap`. Keep each branch to one change.

## Getting set up

Follow [Getting started](README.md#getting-started) in the README.

## Before you open a pull request

- Run `npm run type-check` and `npm run build`. CI runs the same two commands.
- Check UI changes on a mobile viewport. Massimino must work from phone to large desktop.
- If you change `prisma/schema.prisma`, say so in the pull request. Local databases are set up with `prisma db push`, and the committed migrations don't yet cover the full schema.
- Use TypeScript and Tailwind, and follow the patterns already in `src/components/`.
- Use `notify()` and `confirmAction()` from `@/lib/notify`, never `window.alert()` or `window.confirm()`.
- New API routes should use `withAuth`, `ok` and `fail` from `@/lib/api`.
- Use the brand colours `#2b5069` (primary) and `#fcfaf5` (background), and the Nunito Sans and Lato fonts through the existing Tailwind families.

`CLAUDE.md` has the full project rules, and they apply whether or not you use an AI assistant.

## What must never be committed

- **Secrets:** API keys, passwords, tokens or `.env` files. Use `.env.example` to document a new variable, with an empty value.
- **Personal data:** real names, email addresses, photos or anything exported from a production database. Use `example.com` addresses in seeds and tests.
- **Material you don't have rights to:** textbook or course content, paywalled articles, or images and video without a licence that allows redistribution. Exercise and training content should be your own or openly licensed, and its source should be credited.

## Fitness and health content

Massimino gives people advice about their bodies. Keep claims evidence-based, cite sources where you can, and don't make medical claims.

## Licence

By submitting a contribution, you agree it is licensed under the [Apache License 2.0](LICENSE), as set out in section 5 of that licence.

## Security

Please report vulnerabilities privately, as described in [SECURITY.md](SECURITY.md), and not in a public issue.

## Conduct

Be respectful and assume good faith. Massimino exists to make training safer and free of harassment, and the same standard applies to this project.

# Knowledge files

Markdown files in this directory are read at runtime by Massichat and the workout suggestions. The directory is server-only and is never served from `public/`.

The repository ships with one original summary, `massimino_hypertrophy_science.md`. Any other `.md` file you add here is picked up automatically by the keyword search in `src/services/ai/vector_search.ts`.

`src/services/ai/workout-suggestions.ts` can also read structured notes from `NASM_CPT/converted/` and `NASM_CNC/converted/` when they exist. The hosted Massimino service uses licensed course material there, which cannot be redistributed, so those folders are not in this repository. The features work without them, with less background knowledge to draw on.

Only add material you have the right to share publicly. Keep licensed source documents in `data/private/`, which is gitignored.

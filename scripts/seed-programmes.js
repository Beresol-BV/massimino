#!/usr/bin/env node
// Runs the programme seeds in dependency order: the later seeds need the system
// user and athlete profiles that periodization-seed creates.
const { execSync } = require('child_process');

const seeds = ['periodization-seed', 'programs-seed', 'hiit-hyrox-seed', 'new-programs-seed'];

for (const seed of seeds) {
  console.log(`\n==> ${seed}`);
  execSync(`npx ts-node --transpile-only -r dotenv/config prisma/${seed}.ts`, {
    stdio: 'inherit',
    env: {
      ...process.env,
      TS_NODE_COMPILER_OPTIONS: JSON.stringify({ module: 'commonjs', moduleResolution: 'node' }),
    },
  });
}

import { defineConfig } from 'tsup';

export default defineConfig([
  // Main entry point
  {
    entry: ['src/index.tsx'],
    format: ['cjs', 'esm'],
    dts: true,
  },
  // Tailwind preset
  {
    entry: ['src/styles/tailwind.preset.ts'],
    format: ['cjs', 'esm'],
    dts: true,
  },
]);

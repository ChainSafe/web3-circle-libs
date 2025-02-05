import type { Config } from 'tailwindcss';
import { tailwindPreset } from './src/styles/tailwind.preset';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  presets: [tailwindPreset],
  theme: {
    extend: {},
  },
} satisfies Config;

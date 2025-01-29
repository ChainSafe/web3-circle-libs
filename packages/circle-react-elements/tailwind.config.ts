import type { Config } from 'tailwindcss';
import elementsPreset from './src/styles/tailwind.preset';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  presets: [elementsPreset],
  theme: {
    extend: {},
  },
} satisfies Config;

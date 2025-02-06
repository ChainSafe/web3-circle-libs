import circlePreset from '@circle-libs/react-elements/tailwind.preset';
import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}',
    // 'node_modules/@circle-libs/react-elements/dist/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [circlePreset],
  theme: {
    extend: {},
  },
} satisfies Config;

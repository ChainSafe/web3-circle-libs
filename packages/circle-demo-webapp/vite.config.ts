import { defineConfig } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';
import path from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

declare module '@remix-run/node' {
  interface Future {
    v3_singleFetch: true;
  }
}

const isStorybook = process.argv[1]?.includes('storybook');

export default defineConfig({
  plugins: [
    !isStorybook
      ? remix({
          future: {
            v3_fetcherPersist: true,
            v3_relativeSplatPath: true,
            v3_throwAbortReason: true,
            v3_singleFetch: true,
            v3_lazyRouteDiscovery: true,
          },
        })
      : react(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './app'),
    },
  },
});

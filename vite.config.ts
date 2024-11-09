import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
  // Add the following section for build optimization (minification and compression)
  build: {
    minify: true, // Enable minification
    compress: true, // Enable compression (uses brotli by default)
    sourcemap: true, // Optional: Enable source maps for debugging
  },
});

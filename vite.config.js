import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), svgr({ include: '**/*.svg' })],
  server: {
    host: '0.0.0.0',
    port: 3000,
    hmr: true
  },
  preview: {
    port: 3000
  },
  build: {
    outDir: 'build',
    target: ['es2020']
  },
  resolve: {
    alias: {
      src: resolve('src')
    }
  }
});

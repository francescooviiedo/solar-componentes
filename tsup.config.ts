import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ['react', 'react-dom', '@mui/material', '@emotion/react', '@emotion/styled', 'react-hook-form', 'next', '@mui/icons-material', '@mui/x-data-grid'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});

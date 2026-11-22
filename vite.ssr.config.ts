import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The SSR build only produces the prerender entry. It must not copy public/,
// because dist/ already has those files from the client build.
export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: '.ssr',
    emptyOutDir: true,
    rollupOptions: { output: { format: 'es' } },
  },
});

import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  server: {
    port: 3000,
    open: false,
  },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        privacy: fileURLToPath(new URL('./privacy-policy.html', import.meta.url)),
        terms: fileURLToPath(new URL('./terms-of-service.html', import.meta.url)),
        links: fileURLToPath(new URL('./links/index.html', import.meta.url)),
      },
    },
  },
});
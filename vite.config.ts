import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Deployed to a GitHub Pages project site (https://<user>.github.io/Resume/),
  // so asset URLs must be relative to that subpath.
  base: '/Resume/',
  server: {
    host: true,
    allowedHosts: true,
  },
});
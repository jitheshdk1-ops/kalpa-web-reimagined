import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  const isProd = mode === 'production' || command === 'build';
  return {
    plugins: [react()],
    // In local dev, serve from root '/' for clean URL http://localhost:3000/
    // In production build/preview (GitHub Pages), scope under repository base
    base: isProd ? '/kalpa-web-reimagined/' : '/',
    server: {
      port: 3000,
      open: false
    }
  };
});

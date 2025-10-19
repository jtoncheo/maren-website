import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/maren-website/",
  plugins: [react()],
  resolve: {
    alias: {
      crypto: 'crypto-browserify'
    }
  }
});
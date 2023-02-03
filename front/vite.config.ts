import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://i8e208.p.ssafy.io',
      '/v1': 'https://kapi.kakao.com',
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
});

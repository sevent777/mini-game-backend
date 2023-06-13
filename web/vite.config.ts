import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src'), // 根据您的实际项目结构进行调整
    },
  },
  build: {
    outDir: 'build',
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:80', // 本地服务器地址
        changeOrigin: true,
      },
    },
  },
});

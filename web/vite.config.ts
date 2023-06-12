import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';

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
  plugins: [
    react(),
    babel({
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: [['@babel/plugin-proposal-decorators', { loose: true, version: '2022-03' }]],
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:80', // 本地服务器地址
        changeOrigin: true,
      },
    },
  },
});

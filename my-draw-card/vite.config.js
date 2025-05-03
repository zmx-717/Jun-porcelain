import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: '/Jun-porcelain/', // 设置相对路径，确保资源路径正确
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      animejs: 'animejs/lib/anime.es.js', // 指定 animejs 的 ES 模块路径
    },
  },
  server: {
    host: 'localhost',
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    include: ['typewriter-effect'],
  },
})
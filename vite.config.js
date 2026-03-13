import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [vue()],
  // GitHub Pages 專案站：https://<username>.github.io/<repo-name>/
  base: '/vue3-final/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // 讓大寫副檔名 .PNG 也被視為靜態資源
  assetsInclude: ['**/*.PNG'],
})

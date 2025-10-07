import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/test-my-elements-portal/', 
  //解決出現錯誤 `Uncaught ReferenceError: process is not defined`
  define: {
    'process.env': {}
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 將lt-開頭的標籤都視為自定義元素
          isCustomElement: (tag) => tag.toLowerCase().startsWith("lt-")
        }
      },
      customElements: true//支援 Custom Element
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    chunkSizeWarningLimit: 3000, //檔案過大警告，預設500kb
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       // 檢查模組的 id 是否包含你的目標檔案路徑
    //       if (id.includes('assets/my-elements.cjs.js')) {
    //         // 回傳你想要的 chunk 名稱
    //         return 'my-web-components'; 
    //       }
    //     },
    //   },
    // },
  },
})

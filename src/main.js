import './assets/main.css'
await import('@/assets/my-elements.css')//動態載入 Web Component 樣式檔。用 await 讓它獨立包成一個檔
await import('@/assets/my-elements.cjs.js')//動態載入 Web Component 模組。用 await 讓它獨立包成一個檔


import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'

createApp(App).use(ElementPlus).mount('#app')

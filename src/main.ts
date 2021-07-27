import { createApp } from 'vue'
import App from './App.vue'

// 全局引入element-plus
// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'

import router from '@/router/index'

import store from '@/store/index'

createApp(App).use(router).use(store).mount('#app')

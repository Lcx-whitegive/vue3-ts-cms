import { createApp } from 'vue'
import App from './App.vue'

// css初始化
import 'normalize.css'
import './assets/css/index.less'

import router from '@/router/index'
import store from '@/store/index'
import { loadLocalLoginInfo } from '@/store/index'

// 项目全局注册的内容
import globalRegister from './global'

const app = createApp(App)

loadLocalLoginInfo()
app.use(globalRegister)
app.use(router)
app.use(store)
app.mount('#app')

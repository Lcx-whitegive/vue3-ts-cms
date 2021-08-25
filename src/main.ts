import { createApp } from 'vue'
import App from './App.vue'

// css初始化
import 'normalize.css'
import './assets/css/index.less'

import router from './router'
import store from './store'
import { loadLocalLoginInfo } from './store'

// 项目全局注册的内容
import globalRegister from './global'

const app = createApp(App)

app.use(globalRegister)
app.use(store)
loadLocalLoginInfo()
app.use(router)
app.mount('#app')

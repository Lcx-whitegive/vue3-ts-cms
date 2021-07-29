import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router/index'
import store from '@/store/index'

import globalRegister from './global'

// import './service/axios_demo'
import cxRequest from './service'

const app = createApp(App)

// 注册element-plus
app.use(globalRegister)
app.use(router)
app.use(store)
app.mount('#app')

// console.log(process.env)
// console.log(process.env.VUE_APP_BASE_NAME)
interface DataType {
  data: any
  returnCode: string
  success: boolean
}

cxRequest
  .request<DataType>({
    method: 'GET',
    url: '/home/multidata',
    interceptors: {
      requestInterceptor: (config) => {
        console.log('单个请求的请求成功拦截')
        return config
      },
      responsetInterceptor: (res) => {
        console.log('单个请求的响应成功拦截')
        return res
      }
    },
    showLoading: false
  })
  .then((res) => {
    console.log(res)
  })

import CxRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const cxRequest = new CxRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = ''
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      console.log('传入的请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('传入的请求失败的拦截')
      return err
    },
    responsetInterceptor: (res) => {
      console.log('传入的响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('传入的响应失败的拦截')
      return err
    }
  }
})

export default cxRequest

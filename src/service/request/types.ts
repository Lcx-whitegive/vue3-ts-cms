import { AxiosRequestConfig, AxiosResponse } from 'axios'

// 拦截器接口
export interface CxInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responsetInterceptor?: (res: any) => any
  responseInterceptorCatch?: (err: any) => any
}

// 封装请求config接口
export interface CxRequestConfig extends AxiosRequestConfig {
  interceptors?: CxInterceptors
  showLoading?: boolean
}

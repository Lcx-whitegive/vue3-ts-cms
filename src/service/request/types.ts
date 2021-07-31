import { AxiosRequestConfig, AxiosResponse } from 'axios'

// 拦截器接口
export interface CxInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responsetInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

// 封装请求config接口
export interface CxRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: CxInterceptors<T>
  showLoading?: boolean
}

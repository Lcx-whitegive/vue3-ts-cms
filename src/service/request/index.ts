import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { CxInterceptors, CxRequestConfig } from './types'

import { ElLoading } from 'element-plus'
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

// 默认loading是否显示
const DEFAULT_LOADING = true

// 封装的请求类
class CxRequest {
  // 基本信息
  instance: AxiosInstance
  interceptors?: CxInterceptors
  loading?: ILoadingInstance
  showLoading: boolean
  constructor(config: CxRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    // 创建实例传入的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responsetInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    // 所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        console.log(err)
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.loading?.close()
        if (res.data.returnCode === '200') {
          return res.data
        } else {
          console.log('错误信息')
        }
      },
      (err) => {
        // 将loading移除
        this.loading?.close()
        // 请求失败的处理
        if (err.response.status === 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }

  request<T>(config: CxRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求的请求成功拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 判断是否显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求的响应成功拦截器
          if (config.interceptors?.responsetInterceptor) {
            res = config.interceptors.responsetInterceptor(res)
          }
          this.showLoading = DEFAULT_LOADING
          // 通过resolve将结果返回出去
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }
  get<T>(config: CxRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: CxRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: CxRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: CxRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default CxRequest

import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { IRootState, IStoreType } from './types'

import loginModule from './login/login'
import systemModule from './system/system'
import dashboardModule from './analysis/dashboard'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'coderwhy',
      age: 18
    }
  },
  modules: {
    loginModule,
    systemModule,
    dashboardModule
  }
})

// 初始化vuex
export const loadLocalLoginInfo = () => {
  store.dispatch({
    type: 'loginModule/loadLocalLoginInfoAction'
  })
}

// 自定义useStore
export const useStore = (): Store<IStoreType> => {
  return useVuexStore()
}

export default store

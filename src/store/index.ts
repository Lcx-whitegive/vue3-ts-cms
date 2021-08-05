import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { IRootState, IStoreType } from './types'

import loginModule from './login/login'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'coderwhy',
      age: 18
    }
  },
  modules: {
    loginModule
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

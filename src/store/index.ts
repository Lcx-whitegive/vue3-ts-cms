import { createStore } from 'vuex'

import { IRootState } from './types'

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

export const loadLocalLoginInfo = () => {
  store.dispatch({
    type: 'loginModule/loadLocalLoginInfoAction'
  })
}

export default store

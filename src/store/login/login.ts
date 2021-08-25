import { Module } from 'vuex'

import { IRootState } from '../types'
import { ILoginState } from './types'

import { localCache } from '@/utils/cache'

import router from '@/router'

import mapMenusToRoutes from '@/utils/mapMenus'
import { mapMenusToPermissions } from '@/utils/mapMenus'

import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusById
} from '@/service/login/login'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: any) {
      // 登录请求
      const loginRes = await accountLoginRequest(payload.accountInfo)
      const { id, token } = loginRes.data
      commit({
        type: 'changeToken',
        token
      })
      localCache.setCache('token', token)
      // 请求用户信息
      const userInfoRes = await getUserInfoById(id)
      const userInfo = userInfoRes.data
      commit({
        type: 'changeUserInfo',
        userInfo
      })
      localCache.setCache('userInfo', userInfo)
      // 请求用户菜单
      const userMenusRes = await getUserMenusById(userInfo.role.id)
      const userMenus = userMenusRes.data
      commit({
        type: 'changeUserMenus',
        userMenus
      })
      localCache.setCache('userMenus', userMenus)
      // 跳转到首页
      router.push('/main')
    },
    loadLocalLoginInfoAction({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit({
          type: 'changeToken',
          token
        })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit({
          type: 'changeUserInfo',
          userInfo
        })
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit({
          type: 'changeUserMenus',
          userMenus
        })
      }
    }
  },
  mutations: {
    changeToken(state, payload: any) {
      state.token = payload.token
    },
    changeUserInfo(state, payload: any) {
      state.userInfo = payload.userInfo
    },
    changeUserMenus(state, payload: any) {
      state.userMenus = payload.userMenus
      // 动态注册路由
      const routes = mapMenusToRoutes(payload.userMenus)
      routes.forEach((item) => {
        router.addRoute('main', item)
      })
      // 获取按钮权限
      const permissions = mapMenusToPermissions(payload.userMenus)
      state.permissions = permissions
    }
  }
}

export default loginModule

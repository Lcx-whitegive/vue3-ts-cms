import cxRequest from '../index'

import { IAccount, IResult } from './types'

enum LoginAPI {
  AccountLogin = '/login',
  GetUserInfo = '/users/',
  GetUserMenus = '/role/'
}

// 登录请求
export const accountLoginRequest = (account: IAccount) => {
  return cxRequest.post<IResult>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 登录后获取用户信息
export const getUserInfoById = (id: number) => {
  return cxRequest.get<IResult>({
    url: LoginAPI.GetUserInfo + id,
    showLoading: false
  })
}

// 登录后获取用户菜单
export const getUserMenusById = (id: number) => {
  return cxRequest.get<IResult>({
    url: LoginAPI.GetUserMenus + id + '/menu',
    showLoading: false
  })
}

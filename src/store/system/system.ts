import { Module } from 'vuex'
import { IRootState } from '../types'
import { ISystemState } from './types'

import {
  deletePageData,
  getPageList,
  addPageData,
  editPageData
} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      departmentList: [],
      departmentCount: 0
    }
  },
  mutations: {
    changeUsersList(state, payload) {
      state.userList = payload.list
    },
    changeUsersCount(state, payload) {
      state.userCount = payload.count
    },
    changeRoleList(state, payload) {
      state.roleList = payload.list
    },
    changeRoleCount(state, payload) {
      state.roleCount = payload.count
    },
    changeGoodsList(state, payload) {
      state.goodsList = payload.list
    },
    changeGoodsCount(state, payload) {
      state.goodsCount = payload.count
    },
    changeMenuList(state, payload) {
      state.menuList = payload.list
    },
    changeMenuCount(state, payload) {
      state.menuCount = payload.count
    },
    changeDepartmentList(state, payload) {
      state.departmentList = payload.list
    },
    changeDepartmentCount(state, payload) {
      state.departmentCount = payload.count
    }
  },
  actions: {
    async getPageList({ commit }, payload: any) {
      const pageUrl = `${payload.pageName}/list`
      const pageListRes = await getPageList(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageListRes.data
      const changePageName =
        payload.pageName.slice(0, 1).toUpperCase() + payload.pageName.slice(1)
      commit({
        type: `change${changePageName}List`,
        list
      })
      commit({
        type: `change${changePageName}Count`,
        count: totalCount
      })
    },
    deletePageDataAction(context, payload: any) {
      return new Promise((resolve, reject) => {
        deletePageData(`${payload.pageName}/${payload.id}`)
          .then((res) => {
            if (res.code === 0) {
              resolve('删除成功!')
            }
          })
          .catch((err) => {
            reject(err + '删除失败!')
          })
      })
    },
    addPageData(context, payload: any) {
      return new Promise((resolve, reject) => {
        console.log(payload.info)
        addPageData(payload.pageName, payload.info)
          .then((res) => {
            if (res.code === 0) {
              resolve('添加成功')
            }
          })
          .catch((err) => {
            reject(err + '添加失败')
          })
      })
    },
    editPageDataAction(context, payload: any) {
      return new Promise((resolve, reject) => {
        console.log(payload.info, payload.id)
        editPageData(`${payload.pageName}/${payload.id}`, payload.info)
          .then((res) => {
            console.log(res)
            if (res.code === 0) {
              resolve('修改成功！')
            }
          })
          .catch((err) => {
            reject(err + '修改失败')
          })
      })
    }
  }
}
export default systemModule

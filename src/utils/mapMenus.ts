import { IBreadcrumb } from '@/base-ui/cx-breadcrumb/types'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

export default function (userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 先加载所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routesFiles = require.context('../router/main', true, /\.ts/)
  routesFiles.keys().forEach((item) => {
    const route = require('../router/main' + item.split('.')[1])
    allRoutes.push(route.default)
  })
  // 根据userMenus获取需要动态注册的routes
  const _recurseGetRoute = (userMenus: any[]) => {
    userMenus.forEach((item) => {
      if (item.type === 2) {
        const route = allRoutes.find((r) => r.path === item.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = item
        }
      } else {
        _recurseGetRoute(item.children)
      }
    })
  }
  _recurseGetRoute(userMenus)
  return routes
}

// 映射面包屑
export const mapBreadcrumbs = (userMenus: any[], currentPath: string) => {
  const breadcrumbs: IBreadcrumb[] = []
  userMenus.forEach((item) => {
    if (item.type === 1) {
      item.children.forEach((m: any) => {
        if (m.type === 2 && m.url === currentPath) {
          breadcrumbs.push({ name: item.name })
          breadcrumbs.push({ name: m.name })
        }
      })
    }
  })
  return breadcrumbs
}

// 映射按钮权限
export const mapMenusToPermissions = (userMenus: any[]) => {
  const permissions: string[] = []

  const _recurseGetPermissions = (userMenus: any[]) => {
    userMenus.forEach((item) => {
      if (item.type !== 3) {
        _recurseGetPermissions(item.children ?? [])
      } else {
        permissions.push(item.permission)
      }
    })
  }

  _recurseGetPermissions(userMenus)

  return permissions
}

export { firstMenu }

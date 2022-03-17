import { RouterOptions, RouteConfig } from '../types'
import VueRouter from './vue'

class WebHistory {
  options: RouterOptions

  auth: string = ''

  constructor(options: RouterOptions) {
    this.options = options
  }

  // 只支持本项目的路由，未知路由请使用 inyPush
  push(route: RouteConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      VueRouter.instance!.push(
        {
          path: route.path,
          query:  {
            ...route.data,
            token: this.auth
          }
        },
        resolve,
        reject
      )
    })
  }

  // 只支持本项目 和 http 的路由
  pushH5(route: RouteConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      // 先默认在本项目中寻找，找不到在后续进行
      const name = '/' + route.path

      if (VueRouter.instance!.options.routes.find((v: any) => v.path === name)) {
        VueRouter.instance!.push(
          {
            path:  name,
            query:  {
              ...route.data,
              token: this.auth
            }
          },
          resolve,
          reject
        )

        return
      }

      // 这里是解决http链接的情况
      if (route.path.indexOf('http') === -1) {
        route.path = `${this.options.host}/${route.path}`
      }

      try {
        // 这里要带上用户信息，有两种情况
        // 第一种是：h5 环境下的token
        // 第二种是: 小程序的token

        const index = route.path.indexOf('?')

        route.path += index === -1 ? '?token=' + this.auth : '&token=' + this.auth

        if (route.query) {
          route.path += '&' + route.query.substring(1)
        }

        window.location.href = route.path

        resolve()

        return
      } catch (error) {
        reject(error)
      }

      return
    })
  }

  // 只支持本项目的路由，未知路由请使用 inyPush
  replace(route: RouteConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      VueRouter.instance!.replace(
        {
          path: route.path,
          query: route.data as any
        },
        resolve,
        reject
      )
    })
  }

  back(delta: number = 1): void {
    VueRouter.instance!.go(-delta)
  }

  nativeBack(delta: number = 1): void {
    this.back(delta)
  }

  setAuth(auth: string): void {
    this.auth = auth
  }
}

export default WebHistory

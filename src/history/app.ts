import { RouteConfig, RouterOptions } from '../types'
import routes, { matchRoute } from '../routes'
import VueRouter from './vue'
import { Base64 } from 'js-base64'

class AppHistory {
  options: RouterOptions

  auth: string = ''

  constructor(options: RouterOptions) {
    this.options = options
  }

  push(route: RouteConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // 这里是处理特殊的编码情况，不负责处理 webview 的情况

        if (route.data && route.data.report) {
          delete route.data.report
        }

        if (route.encode) {
          // @ts-ignore
          const params = Base64[route.encode](JSON.stringify(route.data))

          location.href = route.fullPath + '&params=' + params

          resolve()
          return
        }

        route.fullPath += '&params=' + JSON.stringify(route.data)

        location.href = route.fullPath

        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  pushH5(route: RouteConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const r = routes.get('APP-webview')

        let path = route.path

        const index = path.indexOf('?')

        if (route.query) {
          path += index === -1 ? route.query : '&' + route.query.substring(1)
        }

        if (path.indexOf('http') !== 0) {
          const options = VueRouter.instance!.options
          const name = index === - 1 ? route.path : route.path.substr(0, index)

          if (options!.routes!.find((v: any) => v.path === '/' + name)) {
            path = this.options.host + options.base + path

          } else {
            path = this.options.host + '/' + path
          }
        }

        if (r && r.encode) {
          // @ts-ignore
          path = Base64[r.encode](path)

          location.href = r.fullPath + `&params={h5url:"${path}"}`

          resolve()
        }

        reject(new Error('app route webview is not found'))
      } catch (error) {
        reject(error)
      }
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
    this.push(matchRoute('APP', 'back', {}, this.options.stringifyQuery!))
      .then(() => {
        // empty
      })
      .catch(() => {
        // emptuy
      })
  }

  setAuth(auth: string): void {
    this.auth = auth
  }
}

export default AppHistory

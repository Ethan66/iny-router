import { RouteConfig, RouterOptions } from '../types'

class WxHistory {
  options: RouterOptions

  constructor(options: RouterOptions) {
    this.options = options
  }

  // 小程序使用的 push

  push(route: RouteConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      if (route.query) {
        route.fullPath += route.query
      }

      // @ts-ignore
      wx[route.tab ? 'switchTab' : 'navigateTo']({
        url: '/' + route.fullPath,
        success: resolve,
        fail: reject
      })
    })
  }

  // 小程序 中使用的 push，采用 webview 承载

  pushH5(route: RouteConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      if (route.fullPath.indexOf('http') === -1) {
        route.fullPath = this.options.host + '/' + route.fullPath
      }

      const fullPath =
        '/pages/webview/index' +
        (route.query
          ? route.query + '&url=' + encodeURIComponent(route.fullPath)
          : '?url=' + encodeURIComponent(route.fullPath))

      // @ts-ignore
      wx.navigateTo({
        url: fullPath,
        success: resolve,
        fail: reject
      })
    })
  }

  replace(route: RouteConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      if (route.query) {
        route.fullPath += route.query
      }

      // @ts-ignore
      wx.redirectTo({
        url: '/' + route.fullPath,
        success: resolve,
        fail: reject
      })
    })
  }

  back(delta: number = 1): void {
    this.nativeBack(delta)
  }

  nativeBack(delta: number = 1): void {
    // @ts-ignore
    wx.navigateBack({
      delta
    })
  }

  setAuth(auth: string): void {
    // empty
  }
}

export default WxHistory

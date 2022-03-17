import { RouteConfig, RouterOptions } from '../types'
import Web from './web'

class WebWxHistory extends Web {
  // 重写 web 中的 push 方法
  push(route: RouteConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      if (route.query) {
        route.fullPath += route.query
      }

      // @ts-ignore
      wx.miniProgram[route.tab ? 'switchTab' : 'navigateTo']({
        url: '/' + route.fullPath,
        success: resolve,
        fail: reject
      })
    })
  }

  nativeBack(delta: number = 1): void {
    // @ts-ignore
    wx.miniProgram.navigateBack({
      delta
    })
  }
}

export default WebWxHistory

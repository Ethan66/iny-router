import Router, { RouterOptions, History, Query } from './types'
import VueRouter from 'vue-router'
import { Env, RouterMode } from './types/router'
import Wx from './history/wx'
import Web from './history/web'
import App from './history/app'
import WebWx from './history/webwx'

import routes, { formatRoutes, matchRoute } from './routes'
import defaults from './defaults'
import _VueRouter from './history/vue'

class InyRouter implements Router {
  mode: RouterMode

  options: RouterOptions

  history: History

  auth: string = ''

  env: Env = 'WEB'

  constructor(options: RouterOptions, VueRouter?: VueRouter) {
    this.mode = options.mode
    this.env = options.mode

    _VueRouter.instance = VueRouter

    if (typeof options.stringifyQuery !== 'function') {
      options.stringifyQuery = defaults.stringifyQuery
    }

    formatRoutes(options.routes, options.mode)

    delete options.routes

    this.options = options

    switch (options.mode) {
      case 'MINI':
        this.history = new Wx(options)
        break
      case 'WEB':
        this.history = new Web(options)
        break
      default:
        throw new Error('options mode is unknow')
    }
  }

  push(path: string, query?: Query): Promise<void> {
    return this.history.push(matchRoute(this.env, path, query, this.options.stringifyQuery!))
  }

  pushH5(path: string, query?: Query): Promise<void> {
    return this.history.pushH5(matchRoute(this.env, path, query, this.options.stringifyQuery!))
  }

  replace(path: string, query?: Query): Promise<void> {
    return this.history.replace(matchRoute(this.env, path, query, this.options.stringifyQuery!))
  }

  inyPush(path: string, type?: number): Promise<void> {
    if (typeof type === 'number' && type !== 23) {
      switch (type) {
        case 18: // app分享赚钱
          return this.push('open-share')
        case 3: // 商品
          return this.push('goods-detail', { goodsId: path })
        case 15: // 活动
          return this.push('sale', { activityId: path })
        case 10:
          return this.push('tag', { tagId: path })
        case 14: // 签到
          return this.push('task')
        case 12: // app分享赚钱
          return this.push('open-share')
        case 17: // 白拿
          return this.push('goods-detail', { goodsId: path })
        case 21: // 逛街领红包
          return this.push('browse-welfare')
        case 22: // 天天拆红包
          return this.push('open-red')
      }
    }

    if (!path) return Promise.resolve()

    if (path.indexOf('http') !== -1) {
      return this.history.pushH5({
        path,
        fullPath: path,
        tab: false
      })
    }

    // 这里的path有可能是带参数的情况
    const index = path.indexOf('?')
    const key = index === -1 ? path : path.substring(0, index)
    let route = routes.get(this.env + '-' + key)

    if (route) {
      route = { ...route }
      // 获取到注册路由, 直接调用 history.push 方法，不需要再次matchRoute
      // 这里要处理 query 和 data 的 情况
      if (index !== -1) {
        const query =  path.substring(index)
        route.query = query
        route.data = defaults.parseQuery(query.substring(1))
      }
      return this.history.push(route)
    }

    const fullPath = `${this.options.host}/${path}`

    return this.history.pushH5({
      path,
      fullPath,
      tab: false
    })
  }

  back(delta?: number): void {
    return this.history.back(delta)
  }

  nativeBack(delta?: number): void {
    return this.history.nativeBack(delta)
  }

  setEnv(env: Env): void {
    this.env = env

    switch (env) {
      case 'APP':
        this.history = new App(this.options)
        break
      case 'MINI':
        this.history = new WebWx(this.options)
        break
      default:
        break
    }
  }

  setAuth(auth: string): void {
    this.auth = auth

    this.history.setAuth(auth)
  }
}

export default InyRouter

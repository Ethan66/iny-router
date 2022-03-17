export interface Route {
  path: string
  query?: Object
  data?: Object
  tab: boolean
  handle?: (route: RouteConfig) => void
}

export interface RouteConfig {
  path: string
  fullPath: string
  query?: string
  data?: { [prop: string]: any }
  tab: boolean
  encode?: string
}

export interface RouteWx {
  path: string
  tab: boolean
}

export interface RouteApp {
  path: string
  fullPath: string
  encode?: string
}

export interface RouteList {
  MINI: RouteWx[]
  APP: RouteApp[]
}

export type RouterMode = 'WEB' | 'MINI'

export type Dictionary<T> = { [key: string]: T }

export type ErrorHandler = (err: Error) => void

export type Query = Dictionary<any>

export type Env = 'MINI' | 'APP' | 'WEB'

/**
 * inyRouter in有内部跳转中心，负责小程序、h5跳转内容
 */
export interface Router {
  mode: string

  options: RouterOptions

  history: History

  auth: string

  env: Env

  setEnv: (env: Env) => void

  setAuth(auth: string): void

  push(path: string, query?: Query): Promise<void>

  pushH5(path: string, query?: Query): Promise<void>

  replace(path: string, query?: Query): Promise<void>

  inyPush(path: string, type?: number): Promise<void>

  back(delta?: number): void

  nativeBack(delta?: number): void
}

export interface RouterOptions {
  routes: RouteList

  mode: RouterMode

  host: string

  stringifyQuery?: (query: Object) => string
}

export interface Location {
  path?: string
  query?: Dictionary<any>
}

export interface History {
  push(route: RouteConfig): Promise<void>

  pushH5(route: RouteConfig): Promise<void>

  replace(route: RouteConfig): Promise<void>

  back(delta?: number): void

  nativeBack(delta?: number): void

  setAuth(auth: string): void
}

export interface WxHistory extends History {}

export interface AppHistory extends History {
  auth: string
}

export interface WebHistory extends History {}

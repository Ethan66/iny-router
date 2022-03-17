import { RouteList, RouterMode, RouteConfig, Env, RouteApp } from './types/router'

const routeMap = new Map<string, RouteConfig>()

export function formatRoutes(routes: RouteList, mode: RouterMode) {
  // 微信小程序路由
  const wxRoutes = routes.MINI

  for (let i = 0; i < wxRoutes.length; i++) {
    const route = wxRoutes[i]
    const names = route.path.split('/')

    const path = names.length === 3 ? names[1] : names[2]

    routeMap.set('MINI-' + path, {
      path: path,
      fullPath: route.path,
      tab: route.tab
    })
  }

  // app 路由
  if (mode === 'WEB') {
    for (let i = 0; i < routes.APP.length; i++) {
      const route = routes.APP[i]

      const routeConfig: RouteConfig = {
        path: route.path,
        fullPath: route.fullPath,
        tab: false,
        encode: route.encode
      }

      routeMap.set('APP-' + route.path, routeConfig)
    }
  }
}

export function matchRoute(
  env: Env,
  path: string,
  query: Object = {},
  stringifyQuery: (query: Object) => string
): RouteConfig {
  const route: RouteConfig = {
    path,
    fullPath: path,
    tab: false,
    query: stringifyQuery(query),
    data: query
  }

  const r = routeMap.get(env + '-' + path)

  if (r) {
    route.tab = r.tab
    route.fullPath = r.fullPath
    route.encode = r.encode
  }

  return route
}

export default routeMap

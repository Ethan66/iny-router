import VueRouter from 'vue-router'

interface Router extends VueRouter {
  [propName: string]: any
}

const _VueRouter: {
  instance: Router | undefined
} = {
  instance: undefined
}

export default _VueRouter

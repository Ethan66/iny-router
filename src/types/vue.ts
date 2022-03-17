/**
 * Augment the typings of Vue.js
 */

import Vue from 'vue'
import { Router as InyRouter } from './router'

declare module 'vue/types/vue' {
  interface Vue {
    $inyRouter: InyRouter
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    inyRouter?: InyRouter
  }
}

import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import { LocalStorage, Notify } from 'quasar'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({ store, ssrContext }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiredAuth)) {
      if (LocalStorage.getItem('datauser') === null || localStorage.getItem('datauser') === 'undefined') {
        next({
          path: '/'
        })
        Notify.create({
          icon: 'ion-close',
          color: 'red',
          message: 'Please Login',
          actions: [{ icon: 'close', color: 'white' }]
        })
      } else {
        next()
      }
    } else if (to.matched.some(record => record.meta.requiredPerusahaan)) {
      if (LocalStorage.getItem('dataperusahaan') === null || localStorage.getItem('dataperusahaan') === 'undefined') {
        console.log(LocalStorage)
        next({
          path: '/'
        })
        Notify.create({
          icon: 'ion-close',
          color: 'red',
          message: 'Please Login',
          actions: [{ icon: 'close', color: 'white' }]
        })
      } else {
        next()
      }
    } else if (to.matched.some(record => record.meta.requiredAdmin)) {
      if (LocalStorage.getItem('dataadmin') === null || localStorage.getItem('dataadmin') === 'undefined') {
        next({
          path: '/'
        })
        Notify.create({
          icon: 'ion-close',
          color: 'red',
          message: 'Please Login',
          actions: [{ icon: 'close', color: 'white' }]
        })
      } else {
        next()
      }
    } else {
      next()
    }
  })

  return Router
}

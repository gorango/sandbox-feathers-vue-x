import Vue from 'vue'
import VueRouter from 'vue-router'

import getRoutes, {MEMBERS_ONLY, GUESTS_ONLY} from './utils'

Vue.use(VueRouter)

export default function ({store}) {
  const Router = new VueRouter({
    scrollBehavior: (to, _, savedPos) => new Promise(resolve =>
      setTimeout(() => (savedPos && resolve(savedPos)) ||
        to.hash ? resolve({selector: to.hash}) : resolve({x: 0, y: 0}))),
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
    routes: getRoutes(store)
  })

  Router.beforeEach((routeTo, routeFrom, next) => {
    const membersOnly = routeTo.matched.some(route => route.meta[MEMBERS_ONLY])
    const guestsOnly = routeTo.matched.some(route => route.meta[GUESTS_ONLY])
    const redirectToLogin = () => next({name: 'Login', query: {redirectFrom: routeTo.fullPath}})

    if (!store.state.utils.authLoaded) {
      return next()
    }

    if (!membersOnly) {
      if (guestsOnly && store.state.auth && store.state.auth.accessToken) {
        return next(routeFrom.fullPath || '/')
      }
      return next()
    }

    if (store.state.auth && store.state.auth.accessToken) {
      return store
        .dispatch('auth/authenticate', {strategy: 'jwt', accessToken: store.state.auth.accessToken})
        .then(validUser => validUser ? next() : redirectToLogin())
    } else {
      redirectToLogin()
    }
  })

  return Router
}

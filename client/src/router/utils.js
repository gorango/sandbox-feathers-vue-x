/* eslint-disable object-property-newline */
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import {APP_ROUTES, MEMBERS_ONLY, GUESTS_ONLY} from './routes'

export {MEMBERS_ONLY, GUESTS_ONLY}

export default function getRoutes (store) {
  const chunkify = (name, chunk, folder = 'pages') => () => import(/* webpackChunkName: `${chunk || name}` */ `@/${folder}/${name}.vue`)

  const objectify = (route, _prefix = '') => {
    if (!Array.isArray(route)) { route = [route] }

    const [_path, _guard, _children] = route
    const path = _path.replace(/\/$/, '')
    const names = _path.split('/').map(str => upperFirst(camelCase(str || 'index')))
    const fullName = ([_prefix]).concat(names).map(str => str.replace(/:/g, ''))
    const name = fullName.join('')
    const componentPath = fullName.join('/').replace(/^\//g, '')
    const component = chunkify(componentPath)
    const guard = _guard ? {meta: {[_guard]: true}} : {}
    const routeName = _children ? {} : {name}
    const children = !_children ? {} : {children: _children.map(child => objectify(child, componentPath))}

    return {path, component, ...guard, ...routeName, ...children}
  }

  const routes = [
    {path: '', component: chunkify('Default', null, 'layouts'), children: [
      ...APP_ROUTES.map(route => objectify(route))
    ]},
    {
      path: '/logout',
      name: 'Logout',
      async beforeEnter (routeTo, routeFrom, next) {
        store.dispatch('auth/logout')
        store.commit('users/clearAll')
        next({name: 'Index'})
        const membersOnlyOnPreviousRoute = routeFrom.matched.some(route => route.meta[MEMBERS_ONLY])
        next(membersOnlyOnPreviousRoute ? {name: 'Index'} : {...routeFrom})
      }
    }
  ]

  if (env('MODE') !== 'ssr') {
    routes.push({
      path: '*',
      component: () => import('@/pages/NotFound.vue')
    })
  }

  return routes
}

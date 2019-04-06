import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex, {initAuth} from 'feathers-vuex'

import feathersClient from './api/feathers-client'
import services from './services'
import modules from './modules'
import serverInit from './server-init'

export {feathersClient}

export default function (/* {ssrContext} */) {
  Vue.use(Vuex)
  let plugins = []

  if (env('CLIENT')) {
    const {auth, service, FeathersVuex} = feathersVuex(feathersClient, {idField: 'uuid', enableEvents: false})
    const servicePlugins = services(feathersClient, service)
    plugins = [...servicePlugins, auth({userService: 'users'})]
    Vue.use(FeathersVuex)
  }

  const store = new Vuex.Store({modules, plugins, actions: {serverInit}})

  return store
}

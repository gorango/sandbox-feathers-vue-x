import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex, {initAuth} from 'feathers-vuex'

import {makeFeathersClient} from './api/feathers-client'
import services from './services'

export default async function serverInit (_, {store, req, res}) {
  const {commit, dispatch} = store

  const storage = {
    getItem (key) { return store.state.auth ? store.state.auth.accessToken : '' },
    setItem (key, value) { store.state.auth.accessToken = value },
    removeItem (key) { store.state.auth.accessToken = null }
  }
  // Create a new client for the server
  const feathersClient = makeFeathersClient(storage)
  const {auth, service, FeathersVuex} = feathersVuex(feathersClient, {idField: 'uuid', enableEvents: false})

  Vue.use(FeathersVuex)

  // Initialize service plugins
  services(feathersClient, service).forEach(service => service(store))
  auth({userService: 'users'})(store)

  const authResponse = await initAuth({commit, req, feathersClient, moduleName: 'auth', cookieName: 'feathers-jwt'})

  return authResponse && dispatch('auth/authenticate', {accessToken: store.state.auth.accessToken, strategy: 'jwt'})
}

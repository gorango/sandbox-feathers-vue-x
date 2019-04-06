import { FeathersVuexFind, FeathersVuexGet } from 'feathers-vuex'

export default ({ Vue }) => {
  Vue.component('feathers-vuex-find', FeathersVuexFind)
  Vue.component('feathers-vuex-get', FeathersVuexGet)
}

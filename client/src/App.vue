<template lang="pug">
  #q-app.relative
    template(v-if='!$store.state.utils.authLoaded')
      .absolute.pin.bg-white.z-4(style='z-index: 9999')
    router-view
</template>

<script>
import {mapState} from 'vuex'
import {meta} from '@/meta'

export default {
  name: 'App',

  meta: {
    title: meta.title,
    meta: {
      description: {
        name: 'description',
        content: meta.description
      }
    }
  },

  async preFetch ({store, ssrContext}) {
    const {dispatch} = store
    const {req, res} = ssrContext
    const {accessToken} = (await dispatch('serverInit', {store, req, res}) || {})
  },

  async mounted () {
    const {accessToken} = this.$store.state.auth
    accessToken && await this.$store.dispatch('auth/authenticate', {strategy: 'jwt', accessToken})
    // await this.$store.dispatch('auth/authenticate').catch(() => {})
    this.$store.commit('utils/setLoaded', true)
  },

  computed: {
    ...mapState('auth', ['user', 'isAuthenticatePending']),
  }
}
</script>

<template lang="pug">
  q-layout(view='hHh LpR fff')
    q-header.bg-primary.text-white
      q-toolbar.max-w-xl.mx-auto
        q-toolbar-title
          router-link.text-white(to='/') Sandbox
        template(v-if='user')
          q-btn.ml-2(flat, to='/messages') Messages
          q-btn.ml-2(flat, to='/account') Account
        template(v-else)
          q-btn.ml-2(flat, to='/login') Log in
    q-page-container
      router-view(:key='$route.fullPath')
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'DefaultLayout',

  computed: {
    ...mapState('auth', ['user'])
  }
}
</script>

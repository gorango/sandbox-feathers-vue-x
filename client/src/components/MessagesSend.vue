<template lang="pug">
  q-toolbar.text-primary.bg-white.q-py-md
    q-btn(dense, flat, round, icon='fal fa-smile')
    q-toolbar-title
      form(@submit.prevent='sendMessage')
        q-input(
          :autofocus='$q.screen.gt.sm',
          :autogrow='autogrow',
          rounded, dense, outlined,
          name='newMessage', type='newMessage',
          placeholder='New Message'
          @keydown.enter='sendMessage',
          v-model.trim='newMessage'
        )
          template(v-slot:append)
            q-btn(color='primary', type='submit', dense, flat, round, icon='fal fa-paper-plane')
    q-btn(dense, flat, round, icon='fal fa-microphone')
</template>

<script>
import {mapState} from 'vuex'

export default {
  data: () => ({
    newMessage: '',
    autogrow: false
  }),

  computed: {...mapState('auth', ['user'])},

  mounted () {
    /** BUG:
     * There is an odd quirk with quasar that causes the autogrow input to resize in mobile
     * The current solution is to only set the prop after init
     */
    this.autogrow = true
  },

  methods: {
    async sendMessage (e) {
      if (e.shiftKey) return

      e.preventDefault()

      if (!this.newMessage.length) return

      const data = {
        convoUuid: this.$route.params.convoUuid,
        authorUuid: this.user.uuid,
        body: this.newMessage,
      }
      const {Message} = this.$FeathersVuex
      new Message(data).create()
      this.newMessage = ''
    },
  }
}
</script>

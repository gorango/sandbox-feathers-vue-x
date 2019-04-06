<template lang="pug">
  .w-full
    q-no-ssr
      .py-12.bg-grey-1
        .uploadable.w-48.h-48.mx-auto.relative
          q-btn.ml-4.absolute.pin-t.pin-r.z-top.-mt-2.-mr-2(
            dense,
            round,
            icon='fal fa-times',
            color='grey-1',
            text-color='grey-8',
            v-if='user.avatar',
            @click=`$store.dispatch('users/patch', [user.uuid, {avatar: null, type: 'avatar'}])`
          )
          .w-48.h-48.relative.flex.items-center.justify-center.overflow-hidden.rounded-full.bg-white
            q-avatar(:color='profileColor(user.createdAt)', text-color='white', size='192px')
              template(v-if='user.avatar') #[q-img(:src='user.avatar', :ratio='1')]
              template(v-else) #[span.text-h1 {{user.username.slice(0, 1).toUpperCase()}}]
            .upload.pointer.absolute.pin
              label.text-white.hidden(aria-label='Change Photo') Change Photo
              input.opacity-0.absolute.pin.w-full.h-full.cursor-pointer(
                type='file',
                @change='changeImage',
                ref='uploader',
                name='upload'
              )
      .max-w-sm.mx-auto
        .px-12
          form.q-mt-lg(@submit.prevent='changeUsername')
            q-input(
              round,
              ref='usernameInput',
              @keydown.esc='resetUsername',
              outlined,
              label='Username',
              bg-color='white',
              @input='checkUsername',
              @blur='$v.username.$touch',
              :error='$v.username.$error',
              bottom-slots,
              v-model='username'
            )
              template(v-slot:error)
                | That username is already taken
              template(v-slot:append, v-if='usernameDirty && !usernameOwn')
                template(v-if='usernameLoading')
                  q-spinner(color='primary', size='1em')
                template(v-else)
                  template(v-if='usernameAvailable')
                    q-icon(
                      class='text-green'
                      name='fal fa-check-circle'
                    )
            .row.mt-8
              q-btn(
                flat, color='secondary' rounded,
                to='/logout'
              ) Log out
              .q-space
              template(v-if='usernameDirty && !usernameOwn')
                q-btn.ml-3(
                  flat, color='secondary' rounded,
                  @click='resetUsername'
                ) Cancel
                q-btn.ml-3(
                  color='primary' rounded, type='submit',
                  :disabled='!usernameAvailable'
                  @click='changeUsername'
                ) Save
  </template>

<script>
import {mapState} from 'vuex'
import {debounce} from 'quasar'
import {validationMixin} from 'vuelidate'

import {meta, titleTemplate} from '@/meta'
import profileColor from '@/mixins/profile-color'
import fileUpload from '@/mixins/file-upload'

const usernameInit = {
  usernameDirty: false,
  usernameOwn: true,
  usernameLoading: false
}

export default {
  name: 'AccountPage',

  meta: {
    title: 'Account',
    titleTemplate,
    meta: {
      description: {
        name: 'description',
        content: meta.description
      }
    }
  },

  mixins: [fileUpload, validationMixin, profileColor],

  data: () => ({
    username: '',
    usernameAvailable: false,
    ...usernameInit
  }),

  validations: {
    username: {
      available: function () {
        return this.usernameLoading || this.usernameAvailable || this.usernameOwn
      }
    }
  },

  computed: {
    ...mapState('auth', ['user'])
  },

  mounted () {
    this.username = this.user.username
  },

  methods: {
    _blurUsernameInput () {
      this.$refs.usernameInput.$refs.input.blur()
    },

    _debounceUsername: debounce(async function (username) {
      const {total, data} = await this.$store.dispatch('users/find', {query: {username}})
      this.usernameLoading = false
      this.usernameOwn = total && data[0].username === this.user.username
      this.usernameAvailable = !total || this.usernameOwn
    }, 1000),

    async checkUsername (username) {
      this.$v.$touch()
      this.usernameDirty = true
      this.usernameLoading = true
      this.usernameOwn = false
      await this._debounceUsername(username)
    },

    async changeUsername () {
      const {username} = this
      if (this.usernameAvailable) {
        await this.$store.dispatch('users/patch', [this.user.uuid, {username}])
        this.resetUsername()
      }
      this._blurUsernameInput()
    },

    resetUsername () {
      this.$v.$reset()
      this.username = this.user.username
      Object.keys(usernameInit).map(key => {
        this[key] = usernameInit[key]
      })
      this._blurUsernameInput()
    },

    async changeImage (e) {
      const dataUrl = await this.onFileAdded(e)
      const payload = {dataUrl, type: 'avatar', userUuid: this.user.uuid}
      const user = await this.$store.dispatch('users/patch', [this.user.uuid, payload])
        .catch(() => {})
      if (user) {
        this.$store.commit('auth/setUser', user)
      }
    }
  }
}
</script>

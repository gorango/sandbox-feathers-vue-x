<template lang="pug">
  .max-w-sm.mx-auto
    .bg-white.rounded-lg.shadow-8.mt-24.pb-2.px-8
      .text-center.pt-8
        img.w-32(src='@/assets/images/icon.svg')
      form.q-ma-md.py-8(@submit.prevent='submit')
        q-input.mt-2(
          bg-color='white',
          name='email', type='text', label='Email',
          bottom-slots, outlined,
          v-model='form.email',
          @blur='$v.form.email.$touch',
          :error='$v.form.email.$error'
        )
          template(v-slot:error)
            template(v-if='!$v.form.email.required') Your email is required
            template(v-if='!$v.form.email.email') That does not look like a proper email address
        q-input.mt-2(
          bg-color='white',
          name='password', type='password', label='Password'
          bottom-slots, outlined,
          v-model='form.password',
          @blur='$v.form.password.$touch',
          :error='$v.form.password.$error'
        )
          template(v-slot:error)
            template(v-if='!$v.form.password.required') A password is required
            template(v-if='!$v.form.password.minLength') Minimum 6 characters required
        q-btn.full-width.q-mt-sm(
          rounded, type='submit',
          color='secondary', size='lg',
          :loading='loading'
          @click='submit'
        )
          | Continue
    .text-center.mt-8
      q-btn(
        rounded, flat, noCaps,
        text-color='grey', color='disabled',
        @click='$router.push(`/forgot`)'
      )
        | Trouble loggin in?
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {validationMixin} from 'vuelidate'
import {required, email, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'LoginPage',

  meta: {
    title: 'Log In'
  },

  mixins: [validationMixin],

  data: () => ({
    form: {
      email: '',
      password: ''
    }
  }),

  validations: {
    form: {
      email: {required, email},
      password: {required, minLength: minLength(3)}
    }
  },

  computed: {
    ...mapState('auth', ['isAuthenticatePending']),
    ...mapState('users', ['isFindPending', 'isCreatePending']),
    loading () {
      return this.isAuthenticatePending || this.isCreatePending || this.isFindPending
    }
  },

  methods: {
    ...mapActions('users', ['create', 'find']),
    ...mapActions('auth', ['authenticate']),
    async submit () {
      this.$v.form.$touch()

      if (this.$v.form.$error) {
        return
      }

      const userExists = await this.find({query: {email: this.form.email}})

      if (userExists.total > 0) {
        await this.authenticate({strategy: 'local', ...this.form})
          .then(() => { this.$router.push('/messages') })
          .catch(error => { this.$q.notify(error.message) })
      } else {
        await this.create(this.form)
          .then(async () => this.authenticate({strategy: 'local', ...this.form}))
          .then(() => { this.$router.push('/account') })
          .catch(() => {})
      }
    }
  }
}
</script>

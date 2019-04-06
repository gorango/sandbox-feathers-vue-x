<template lang="pug">
  .max-w-md.mx-auto
    form.my-24
      QInput.bg-white.rounded.-mx-2(
        name='email',
        v-model='form.email',
        :error='$v.form.email.$error',
        type='text',
        float-label='Email',
        :before="[{icon: 'fal fa-fw fa-envelope'}]"
      )
      QInput.bg-white.rounded.-mx-2(
        name='password',
        v-model='form.password',
        :error='$v.form.password.$error',
        type='password',
        float-label='Password',
        :before="[{icon: 'fal fa-fw fa-lock-alt'}]"
      )
      QBtn.full-width.mt-2(
        color='primary',
        size='form-label-hide-underline',
        :loading='loading'
        @click='submit'
      )
        | Continue
      .text-center.mt-4
        QBtn(
          flat,
          noCaps,
          color='disabled',
          to='/forgot'
        )
          | Trouble loggin in?
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {validationMixin} from 'vuelidate'
import {required, email} from 'vuelidate/lib/validators'

export default {
  meta: {
    title: 'Sign up'
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
      password: {required}
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
        this.$q.notify('Please review the fields again.')
        return
      }

      const userExists = await this.find({query: {email: this.form.email}})

      if (userExists.total > 0) {
        await this.authenticate({strategy: 'local', ...this.form})
          .catch(error => { this.$q.notify(error.message) })
      } else {
        await this.create(this.form)
          .then(async () => this.authenticate({strategy: 'local', ...this.form}))
          .catch(() => {})
      }
    }
  }
}
</script>

<template lang="pug">
  .flex-auto.mx-auto.my-24.px-2(style='max-width: 360px')
    h4.mb-2.text-body-1 Reset your password
    p.m-0.text-medium.text-body-2.
      Please enter the email address you used to sign up. We will send you an email with further instructions.
    .w-full.mt-6
      q-input.bg-white.rounded.-mx-2(
        name='email',
        v-model='form.email',
        :error='$v.form.email.$error',
        type='text',
        float-label='Email',
        :before="[{icon: 'fal fa-fw fa-envelope'}]"
      )
        q-btn.full-width.mt-2(
          color='primary',
          size='form-label-hide-underline',
          @click='submit'
        ) Continue
        .text-center.mt-4
          q-btn(
            flat,
            noCaps,
            color='primary',
            to='/forgot'
          ) Contact support
</template>

<script>
import {mapActions} from 'vuex'
import {validationMixin} from 'vuelidate'
import {required, email} from 'vuelidate/lib/validators'

export default {
  meta: {
    title: 'Sign up'
  },
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: ''
    }
  }),
  validations: {
    form: {
      email: {required, email}
    }
  },
  methods: {
    ...mapActions('users', ['create']),
    ...mapActions('auth', ['authenticate']),
    async submit () {
      this.$v.form.$touch()

      if (this.$v.form.$error) {
        this.$q.notify('Please review the fields again.')
        return // eslint-disable-line
      }

      // magic...
    }
  }
}
</script>

<script>
export default {
  mounted () {
    const {h: hash} = this.$route.query
    if (hash) {
      // HACK: fix with SSR
      setTimeout(() => {
        const {accessToken} = this.$store.state.auth
        if (accessToken) {
          this.verify({hash, accessToken})
        } else {
          this.$v.localStorage.set('cl-verify', this.$route.fullPath)
          this.$router.replace('/login')
        }
      }, 1000)
    } else {
      this.$router.replace('/')
    }
  },
  methods: {
    verify ({hash, accessToken}) {
      this.$store.dispatch('auth/verifyUser', {
        action: 'verifySignupLong',
        value: hash
      })
        .then(res => {
          // TODO: notify with snackbar
        })
        .catch(() => {
          // TODO: handle expired
          // TODO: handle hax
        })
    }
  }
}
</script>

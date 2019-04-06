export default {
  namespaced: true,
  state: {
    authLoaded: false
  },
  mutations: {
    setLoaded (state, authLoaded) {
      state.authLoaded = authLoaded
    }
  }
}

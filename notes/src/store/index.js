import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import notes from './notes'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    theme: '',
    username: ''
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    },
    setTheme (state, value) {
      state.theme = value
    },
    setUsername (state, name) {
      state.username = name
    }
  },
  getters: {
    error: s => s.error,
    theme: s => s.theme,
    username: s => s.username
  },
  modules: {
    auth, user, notes
  }
})

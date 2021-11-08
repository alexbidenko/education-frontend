import { Mutations, Actions, Getters } from '~/store/types'

export default {
  state() {
    return {
      user: null,
      country: null,
    }
  },
  actions: {
    [Actions.CHECK_USER]({ commit }, callback) {
      return this.$axios.$get('user/details').then((data) => {
        commit(Mutations.SET_USER, data.user)
        if (callback) callback(data.user)
      })
    },
    [Actions.LOGOUT]({ commit }) {
      commit(Mutations.SET_USER, null)
      this.$axios.setToken(null)
    },
  },
  mutations: {
    [Mutations.SET_USER](state, value) {
      state.user = value
    },
  },
  getters: {
    [Getters.GET_USER](state) {
      return state.user
    },
  },
}

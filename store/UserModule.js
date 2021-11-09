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
      return this.$axios
        .$post('/user/get_email/', { email: this.$cookies.get('USER_EMAIL') })
        .then((data) => {
          commit(Mutations.SET_USER, data)
          if (callback) callback(data)
        })
    },
    [Actions.LOGOUT]({ commit }) {
      commit(Mutations.SET_USER, null)
      this.$axios.setToken(null)
    },
  },
  mutations: {
    [Mutations.SET_USER](state, value) {
      state.user = state.user && value ? { ...state.user, ...value } : value
    },
  },
  getters: {
    [Getters.GET_USER](state) {
      return state.user
    },
  },
}

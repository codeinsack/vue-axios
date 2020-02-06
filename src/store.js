import Vue from 'vue'
import Vuex from 'vuex'
import axios from "./axios-auth";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
  },
  mutations: {

  },
  actions: {
    signup({ commit }, authData) {
      axios.post('accounts:signUp?key=AIzaSyCpWAcEww32N_MIZeAYKELjvduGTrcUeho', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      })
        .then(response => console.log('response', response))
    },
    login({ commit }, authData) {
      axios.post('accounts:signInWithPassword?key=AIzaSyCpWAcEww32N_MIZeAYKELjvduGTrcUeho', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      })
        .then(response => console.log('response', response))
    },
  },
  getters: {

  }
})

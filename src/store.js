import Vue from 'vue'
import Vuex from 'vuex'
import axios from "./axios-auth";
import globalAxios from "axios";

import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null,
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },
    storeUser(state, user) {
      state.user = user
    },
    clearAuthData(state) {
      state.idToken = null
      state.userId = null
    },
  },
  actions: {
    setLogoutTimer({ commit }, expirationTime) {
      setTimeout(() => {
       commit('clearAuthData')
      }, expirationTime * 1000)
    },
    signup({ commit, dispatch }, authData) {
      axios.post('accounts:signUp?key=AIzaSyCpWAcEww32N_MIZeAYKELjvduGTrcUeho', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      })
        .then(response => {
          commit('authUser', {
            token: response.data.idToken,
            userId: response.data.localId,
          })
          dispatch('storeUser', authData)
          dispatch('setLogoutTimer', response.data.expiresIn)
        })
    },
    logout({ commit }) {
      commit('clearAuthData')
      router.replace('/signin')
    },
    login({ commit, dispatch }, authData) {
      axios.post('accounts:signInWithPassword?key=AIzaSyCpWAcEww32N_MIZeAYKELjvduGTrcUeho', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      })
        .then(response => {
          commit('authUser', {
            token: response.data.idToken,
            userId: response.data.localId,
          })
          dispatch('setLogoutTimer', response.data.expiresIn)
        })
    },
    storeUser({ commit, state }, userData) {
      if (!state.idToken) return
      globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
        .then(response => console.log('response', response))
    },
    fetchUser({ commit, state }) {
      if (!state.idToken) return
      globalAxios.get('/users.json' + '?auth=' + state.idToken)
        .then(({ data }) => {
          const users = []
          for (let key in data) {
            const user = data[key]
            user.id = key
            users.push(user)
          }
          console.log('users', users)
          commit('storeUser', users[0])
        })
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    isAuthenticated(state) {
      return state.idToken !== null
    },
  }
})

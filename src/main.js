import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import router from './router'
import store from './store'

axios.defaults.baseURL = 'https://vue-axios-83dd8.firebaseio.com'
axios.defaults.headers.common['Authorization'] = 'token123'
axios.defaults.headers.get['Accepts'] = 'application/json'

const requestInterceptor = axios.interceptors.request.use(config => {
  console.log('config', config)
  return config
})

const responseInterceptor = axios.interceptors.response.use(response => {
  console.log('response', response)
  return response
})

axios.interceptors.request.eject(requestInterceptor)
axios.interceptors.request.eject(responseInterceptor)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://vue-axios-83dd8.firebaseio.com',
})

instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance

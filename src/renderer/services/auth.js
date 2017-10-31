import rootState from './root'
import axios from 'axios'

export default{
  register (request) {
    return axios.post(rootState.urlRoot + '/auth/register', request)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },
  login (request) {
    return axios.post(rootState.urlRoot + '/auth/login', request)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  }
}

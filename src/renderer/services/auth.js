import rootSvc from './root'
import axios from 'axios'

export default{
  register (request) {
    return axios.post(rootSvc.urlRoot + '/auth/register', request, rootSvc.getHeaders())
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },
  login (request) {
    return axios.post(rootSvc.urlRoot + '/auth/login', request, rootSvc.getHeaders())
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },
  confirmEmail (request) {
    return axios.get(rootSvc.urlRoot + '/auth/confirm_email/' + request.token, rootSvc.getHeaders())
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },
  getSession (request) {
    return axios.get(rootSvc.urlRoot + `/auth/session`, rootSvc.getHeaders())
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  }
}

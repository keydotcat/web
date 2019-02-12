import rootSvc from './root'
import axios from 'axios'

export default {
  register(request) {
    return axios
      .post(rootSvc.urlRoot + '/auth/register', request, rootSvc.getHeaders())
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error))
  },
  login(request) {
    var config = rootSvc.getHeaders()
    config['errorPrefix'] = 'login.error.'
    return axios
      .post(rootSvc.urlRoot + '/auth/login', request, config)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error))
  },
  confirmEmail(request) {
    return axios
      .get(rootSvc.urlRoot + '/auth/confirm_email/' + request.token, rootSvc.getHeaders())
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error))
  },
  resendConfirmEmail(request) {
    return axios
      .post(rootSvc.urlRoot + '/auth/request_confirmation_token', request, rootSvc.getHeaders())
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error))
  },
  getSession(request) {
    return axios
      .get(rootSvc.urlRoot + `/auth/session`, rootSvc.getHeaders())
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error))
  }
}

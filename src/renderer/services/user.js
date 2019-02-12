import rootSvc from './root'
import axios from 'axios'

export default {
  loadInfo() {
    return axios
      .get(rootSvc.urlRoot + '/user', rootSvc.getHeaders())
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error))
  },
  createTeam(request) {
    return axios
      .post(rootSvc.urlRoot + '/team', request, rootSvc.getHeaders())
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error))
  },
  changeEmail(email) {
    return axios
      .put(rootSvc.urlRoot + '/user', { email: email }, rootSvc.getHeaders())
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error))
  },
  changePassword(password, keys) {
    return axios
      .put(rootSvc.urlRoot + '/user', { password: password, user_keys: keys }, rootSvc.getHeaders())
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error))
  }
}

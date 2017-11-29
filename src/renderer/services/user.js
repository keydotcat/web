import rootSvc from './root'
import axios from 'axios'

export default{
  loadInfo () {
    return axios.get(rootSvc.urlRoot + '/user', rootSvc.getHeaders())
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },
  createTeam (request) {
    return axios.post(rootSvc.urlRoot + '/team', request, rootSvc.getHeaders())
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  }
}
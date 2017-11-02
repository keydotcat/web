import rootSvc from './root'
import axios from 'axios'

export default{
  getSessionData (request) {
    return axios.get(rootSvc.urlRoot + `/session/${request.token}`, rootSvc.getHeaders())
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  }
}

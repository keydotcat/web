import rootSvc from './root'
import axios from 'axios'

export default{
  loadInfo (request) {
    return axios.get(rootSvc.urlRoot + '/user', rootSvc.getHeaders())
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  }
}

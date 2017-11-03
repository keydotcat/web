import rootSvc from './root'
import axios from 'axios'

export default{
  loadInfo (tid) {
    return axios.get(rootSvc.urlRoot + '/team/' + tid, rootSvc.getHeaders())
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  }
}

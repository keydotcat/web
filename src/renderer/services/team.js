import rootSvc from './root'
import axios from 'axios'

export default{
  loadInfo (tid) {
    return axios.get(rootSvc.urlRoot + '/team/' + tid, rootSvc.getHeaders())
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },
  invite (tid, invite) {
    return axios.post(rootSvc.urlRoot + '/team/' + tid + '/user', { invite: invite }, rootSvc.getHeaders())
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },
  promoteUser(tid, uid, keys) {
    var payload = {
      admin: true,
      keys: keys
    }
    return axios.patch(`${rootSvc.urlRoot}/team/${tid}/user/${uid}`, payload, rootSvc.getHeaders())
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },
  demoteUser(tid, uid) {
    var payload = {
      admin: false
    }
    return axios.patch(`${rootSvc.urlRoot}/team/${tid}/user/${uid}`, payload, rootSvc.getHeaders())
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },
  addUserToVault(tid, vid, userKeys) {
    return axios.post(`${rootSvc.urlRoot}/team/${tid}/vault/${vid}/user`, userKeys, rootSvc.getHeaders())
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },
  removeUserFromVault(tid, vid, uid) {
    return axios.delete(`${rootSvc.urlRoot}/team/${tid}/vault/${vid}/user/${uid}`, rootSvc.getHeaders())
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },
  createVault(tid, vid, vaultKeys) {
    return axios.post(`${rootSvc.urlRoot}/team/${tid}/vault`, {name: vid, vault_keys: vaultKeys}, rootSvc.getHeaders())
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },
  createSecret({teamId, vaultId, payload}) {
    return axios.post(`${rootSvc.urlRoot}/team/${teamId}/vault/${vaultId}/secret`, {data: payload}, rootSvc.getHeaders())
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },
  createSecretList({teamId, vaultId, payload}) {
    return axios.post(`${rootSvc.urlRoot}/team/${teamId}/vault/${vaultId}/secrets`, {secrets: payload}, rootSvc.getHeaders())
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },
  updateSecret({teamId, vaultId, secretId, payload}) {
    return axios.put(`${rootSvc.urlRoot}/team/${teamId}/vault/${vaultId}/secret/${secretId}`, {data: payload}, rootSvc.getHeaders())
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },
  deleteSecret(tid, vid, sid) {
    return axios.delete(`${rootSvc.urlRoot}/team/${tid}/vault/${vid}/secret/${sid}`, rootSvc.getHeaders())
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },
  loadSecrets(tid) {
    return axios.get(`${rootSvc.urlRoot}/team/${tid}/secret`, rootSvc.getHeaders())
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  }
}

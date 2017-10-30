// import workerMgr from '@/worker/manager'
import rootSvc from '@/services/root'
import * as mt from '@/store/mutation-types'

const state = {
  urlRoot: '',
  sessionToken: ''
}

const mutations = {
  [mt.SESSION_SET_URL_ROOT] (state, urlRoot) {
    state.urlRoot = urlRoot
    rootSvc.setUrlRoot(urlRoot)
  },
  [mt.SESSION_LOGOUT] (state) {
    state.sessionToken = ''
  }
}

const actions = {
  login (context, payload) {
    console.log('requested login with ', payload)
  }
}

export default {
  state,
  mutations,
  actions
}

// import workerMgr from '@/worker/manager'
import rootSvc from '@/services/root'
import * as mt from '@/store/mutation-types'

const LS_KEYCAT_URL_ROOT = 'lsKeyCatUrlRoot'

const state = {
  urlRoot: '',
  sessionToken: ''
}

const mutations = {
  [mt.SESSION_LOAD_STATE_FROM_STORAGE] (state) {
    var urlRoot = localStorage.getItem(LS_KEYCAT_URL_ROOT)
    if( urlRoot === null ) {
      urlRoot = process.env.NODE_ENV === 'development' ? 'http://localhost:23764' : 'https://pen.key.cat/api'
    }
    state.urlRoot = urlRoot
    rootSvc.setUrlRoot(urlRoot)
  },
  [mt.SESSION_SET_URL_ROOT] (state, urlRoot) {
    state.urlRoot = urlRoot
    rootSvc.setUrlRoot(urlRoot)
    localStorage.setItem(LS_KEYCAT_URL_ROOT, urlRoot)
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

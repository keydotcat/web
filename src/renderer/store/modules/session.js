import workerMgr from '@/worker/manager'
import rootSvc from '@/services/root'
import sessionSvc from '@/services/session'
import * as mt from '@/store/mutation-types'
import router from '@/router'

const LS_KEYCAT_URL_ROOT = 'lsKeyCatUrlRoot'
const LS_KEYCAT_SESSION_DATA = 'lsKeyCatSessionData'

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
    rootSvc.setToken(state.sessionToken)
  },
  [mt.SESSION_LOGIN] (state, payload) {
    state.sessionToken = payload.token
    rootSvc.setToken(state.sessionToken)
  }
}

const actions = {
  sessionStoreServerSession (context, payload) {
    var srvKeys = { publicKeys: payload.sessionData.public_key, secretKeys: payload.sessionData.secret_key }
    workerMgr.setKeysFromServer( payload.password, payload.sessionData.store_token, srvKeys ).then((storedKeys) => {
      var sData = { keys: storedKeys, uid: payload.sessionData.user_id, token: payload.sessionData.session_token }
      localStorage.setItem(LS_KEYCAT_SESSION_DATA, JSON.stringify(sData))
      context.commit(mt.SESSION_LOGIN, {token: payload.sessionData.session_token})
      router.push('/house')
    })
  },
  sessionLoadFromLocalStorage (context) {
    var stub = localStorage.setItem(LS_KEYCAT_SESSION_DATA)
    if( !stub || stub.length === 0 ) {
      return
    }
    var data = JSON.parse( stub )
    context.commit(mt.SESSION_LOGIN, data)
    sessionSvc.getSessionData(data).then((sessionData) => {
      console.log('session data', sessionData)
      workerMgr.setKeysFromStore( sesionData.store_token, storedKeys ).then((ok) => {
        console.log('ok')
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}

import workerMgr from '@/worker/manager'

const state = {
  urlRoot: '',
  sessionToken: ''
}

const mutations = {
  SESSION_URL_ROOT (state, urlRoot) {
    state.urlRoot = urlRoot
  },
  SET_SESSION_TOKEN (state, payload) {
    state.sessionToken = payload
  },
  CLEAR_SESSION_TOKEN (state) {
    state.sessionToken = ''
  }
}

const actions = {
  sessionLogin (context, payload) {
    context.commit('SESSION_URL_ROOT', payload.urlRoot)
    console.log('Requested login with', payload.username, context.state.urlRoot)
    workerMgr.generateUserKey(payload.username, payload.password).then((data) => {
      console.log('Got user key', data)
      this.$http.post(context.state.urlRoot + '/login', payload).then((data) => {
        console.log('hello', data)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}

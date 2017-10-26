const state = {
  urlRoot: process.env.NODE_ENV === 'developent' ? 'http://localhost:27312' : 'https://pen.key.cat/api',
  sessionToken: ''
}

const mutations = {
  SET_URL_ROOT (state, urlRoot) {
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
  requestLogin (context, payload) {
    this.http.post(this.state.urlRoot + '/login', payload).then((data) => {
      console.log('hello', data)
    })
  }
}

export default {
  state,
  mutations,
  actions
}

import * as mt from '@/store/mutation-types'

const state = {
  contents: '',
  type: ''
}

const mutations = {
  [mt.MSG_INFO] (state, payload) {
    state.type = 'info'
    state.contents = payload
  },
  [mt.MSG_ERROR] (state, payload) {
    state.type = 'error'
    state.contents = payload
  },
  [mt.MSG_CLEAR] (state) {
    state.contents = ''
  }
}

export default {
  state,
  mutations
}

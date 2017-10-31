import * as mt from '@/store/mutation-types'

const state = {
  page: 'login'
}

const mutations = {
  [mt.PUBLIC_NAV_SET] (state, payload) {
    state.page = payload
  }
}

export default {
  state,
  mutations
}

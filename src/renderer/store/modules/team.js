import * as mt from '@/store/mutation-types'

const state = {
  teams: [],
  activeTeam: ''
}

const mutations = {
  [mt.TEAM_LOAD_INFO] (state, payload) {
    console.log( 'load team info from payload', payload)
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}

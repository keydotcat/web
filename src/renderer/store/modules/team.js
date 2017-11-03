import rootSvc from '@/services/root'
import teamSvc from '@/services/team'
import * as mt from '@/store/mutation-types'

const state = {
  id: '',
  name: '',
  users: [],
  vaults: []
}

const mutations = {
  [mt.TEAM_LOAD_INFO] (state, payload) {
    state.id = payload.id
    state.name = payload.name
    state.users = payload.users
    state.vaults = payload.vaults
  }
}

const actions = {
  teamLoadInfo (context, tid) {
    teamSvc.loadInfo(tid).then((teamData) => {
      context.commit(mt.TEAM_LOAD_INFO, teamData)
    }).catch((err) => {
      context.commit(mt.MSG_ERROR, rootSvc.processError(err))
    })
  }
}

export default {
  state,
  mutations,
  actions
}

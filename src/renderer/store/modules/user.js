import rootSvc from '@/services/root'
import userSvc from '@/services/user'

import router from '@/router'
import * as mt from '@/store/mutation-types'

const state = {
  fullname: '',
  id: '',
  teams: [],
  activeTeamIdx: -1
}

const mutations = {
  [mt.USER_LOAD_INFO] (state, payload) {
    state.fullname = payload.fullname
    state.id = payload.id
    state.teams = payload.teams
    for (var i = 0; i < payload.teams.length; i++) {
      var t = payload.teams[i]
      if (t.primary) {
        state.activeTeamIdx = i
        break
      }
    }
    if (state.activeTeamIdx === -1){
      state.activeTeamIdx = 0
    }
  }
}

const getters = {
  activeTeam (state) {
    return state.teams[state.activeTeamIdx]
  }
}

const actions = {
  userLoadInfo(context) {
    userSvc.loadInfo().then((info) => {
      context.commit(mt.USER_LOAD_INFO, info)
      var tid = context.state.teams[context.state.activeTeamIdx].id
      router.push('/home/' + tid)
    }).catch((err) => {
      context.commit(mt.AUTH_STOP_WORK)
      context.commit(mt.MSG_ERROR, rootSvc.processError(err))
    })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}

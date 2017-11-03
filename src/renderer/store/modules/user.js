import rootSvc from '@/services/root'
import workerMgr from '@/worker/manager'
import userSvc from '@/services/user'

import router from '@/router'
import * as mt from '@/store/mutation-types'

const state = {
  fullname: '',
  id: '',
  publicKeys: '',
  teams: [],
  activeTeamIdx: -1
}

const mutations = {
  [mt.USER_LOAD_INFO] (state, payload) {
    state.fullname = payload.fullname
    state.id = payload.id
    state.publicKeys = payload.public_key
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
  },
  nonActiveTeams (state) {
    return state.teams.filter((team, pos) => { return pos !== state.activeTeamIdx })
  }
}

const actions = {
  userLoadInfo(context) {
    userSvc.loadInfo().then((info) => {
      context.commit(mt.USER_LOAD_INFO, info)
      var tid = context.state.teams[context.state.activeTeamIdx].id
      router.push('/home/' + tid)
    }).catch((err) => {
      context.commit(mt.MSG_ERROR, rootSvc.processError(err))
    })
  },
  userCreateTeam(context, payload) {
    console.log('create team name', payload)
    var req = {}
    req[context.state.id] = context.state.publicKeys
    workerMgr.generateVaultKeys(req).then((vaultKeys) => {
      userSvc.createTeam({name: payload, vault_keys: vaultKeys}).then((teamInfo) => {
        context.dispatch('userLoadInfo')
      }).catch((err) => {
        context.commit(mt.MSG_ERROR, rootSvc.processError(err))
      })
    })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}

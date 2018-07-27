import rootSvc from '@/services/root'
import workerMgr from '@/worker/manager'
import userSvc from '@/services/user'

import router from '@/router'
import * as mt from '@/store/mutation-types'

const state = {
  fullname: '',
  id: '',
  publicKeys: '',
  teams: []
}

const mutations = {
  [mt.USER_LOAD_INFO] (state, payload) {
    state.fullname = payload.fullname
    state.id = payload.id
    state.publicKeys = payload.public_key
    state.teams.splice(0, state.teams.length)
    for( var i = 0; i < payload.teams.length; i++){
      state.teams.push(payload.teams[i])
    }
  }
}

const getters = {
  team_ids: state => {
    const teams = [...state.teams].sort((a, b) => {
      if(a.name > b.name){ return 1 }
      if(a.name < b.name){ return -1 }
      return 0
    })
    return teams.map((team) => team.id)
  },
  teams: state => {
    const teams = [...state.teams].sort((a, b) => {
      if(a.name > b.name){ return 1 }
      if(a.name < b.name){ return -1 }
      return 0
    })
    return teams
  }
}

const actions = {
  loadInfo(context) {
    userSvc.loadInfo().then((info) => {
      context.commit(mt.USER_LOAD_INFO, info)
      router.push('/home/data')
    }).catch((err) => {
      context.commit(mt.MSG_ERROR, rootSvc.processError(err))
    })
  },
  createTeam(context, payload) {
    var req = {}
    req[context.state.id] = context.state.publicKeys
    workerMgr.generateVaultKeys(req).then((vaultKeys) => {
      userSvc.createTeam({
        name: payload,
        vault_keys: {
          public_key: vaultKeys.publicKey,
          keys: vaultKeys.keys
        }
      }).then((teamInfo) => {
        context.dispatch('loadInfo')
      }).catch((err) => {
        context.commit(mt.MSG_ERROR, rootSvc.processError(err))
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}

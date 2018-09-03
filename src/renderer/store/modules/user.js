import rootSvc from '@/services/root'
import workerMgr from '@/worker/manager'
import userSvc from '@/services/user'

import router from '@/router'
import * as mt from '@/store/mutation-types'

const state = {
  fullname: '',
  id: '',
  publicKeys: '',
  email: '',
  teams: []
}

const mutations = {
  [mt.USER_LOAD_INFO] (state, payload) {
    state.fullname = payload.fullname
    state.id = payload.id
    state.publicKeys = payload.public_key
    state.email = payload.email
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
  },
  allVaults: (state, getters, rootState, rootGetters) => {
    var vaults = []
    getters['team_ids'].forEach((tid) => {
      rootState[`team.${tid}`].vaults.forEach((vault) => {
        vaults.push({
          tid: tid,
          vid: vault.id,
          teamName: rootState[`team.${tid}`].name
        })
      })
    })
    return vaults
  }
}

const actions = {
  loadInfo(context) {
    userSvc.loadInfo().then((info) => {
      context.commit(mt.USER_LOAD_INFO, info)
      router.push('/home/data/locations')
    }).catch((err) => {
      context.commit(mt.MSG_ERROR, rootSvc.processError(err), {root: true})
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
        context.commit(mt.MSG_INFO, rootSvc.processError(err), {root: true})
      })
    })
  },
  changeEmail(context, email) {
    userSvc.changeEmail(email).then((info) => {
      context.commit(mt.MSG_INFO, 'Email change requested', {root: true})
    }).catch((err) => {
      context.commit(mt.MSG_ERROR, rootSvc.processError(err), {root: true})
    })
  },
  changePassword(context, password) {
    return new Promise((resolve, reject) => {
      workerMgr.closeKeysWithPassword(context.state.id, password).then((data) => {
        userSvc.changePassword(data.password, data.keys).then((info) => {
          context.commit(mt.MSG_INFO, 'Password changed', {root: true})
        }).catch((err) => {
          context.commit(mt.MSG_ERROR, rootSvc.processError(err), {root: true})
        })
        resolve(data)
      }).catch((err) => {
        context.commit(mt.MSG_ERROR, rootSvc.processError(err), {root: true})
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

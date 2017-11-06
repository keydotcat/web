import rootSvc from '@/services/root'
import teamSvc from '@/services/team'
import workerMgr from '@/worker/manager'
import * as mt from '@/store/mutation-types'

const state = {
  id: '',
  name: '',
  owner: '',
  users: [],
  vaults: [],
  invites: []
}

const mutations = {
  [mt.TEAM_LOAD_INFO] (state, payload) {
    state.id = payload.id
    state.name = payload.name
    state.owner = payload.owner
    state.users = payload.users
    state.vaults = payload.vaults
    state.invites = payload.invites
  }
}

function promoteUser(context, uid, pubKey, vaultKeys) {
  workerMgr.cipherVaultKeysForUser(vaultKeys, pubKey).then((userVaultKeys) => {
    teamSvc.promoteUser(context.state.id, uid, userVaultKeys).then((teamData) => {
      context.commit(mt.TEAM_LOAD_INFO, teamData)
    }).catch((err) => {
      context.commit(mt.MSG_ERROR, rootSvc.processError(err))
    })
  })
}

const actions = {
  teamLoadInfo (context, tid) {
    teamSvc.loadInfo(tid).then((teamData) => {
      context.commit(mt.TEAM_LOAD_INFO, teamData)
    }).catch((err) => {
      context.commit(mt.MSG_ERROR, rootSvc.processError(err))
    })
  },
  teamInvite (context, invite) {
    teamSvc.invite(context.state.id, invite).then((teamData) => {
      context.commit(mt.TEAM_LOAD_INFO, teamData)
    }).catch((err) => {
      context.commit(mt.MSG_ERROR, rootSvc.processError(err))
    })
  },
  teamPromoteUsers (context, users) {
    for (var ui = 0; ui < users.length; ui++ ) {
      var vaultKeys = {}
      for (var vi = 0; vi < context.state.vaults.length; vi++ ) {
        var vault = context.state.vaults[vi]
        var found = false
        for (var j = 0; j < vault.users.length; j++) {
          if (vault.users[j] === users[ui].id) {
            found = true
            break
          }
        }
        if (!found) {
          vaultKeys[ vault.id ] = {
            publicKeys: vault.public_key,
            secretKeys: vault.key
          }
        }
      }
      promoteUser(context, users[ui].id, users[ui].public_key, vaultKeys)
    }
  },
  teamDemoteUsers (context, users) {
    for (var i = 0; i < users.length; i++ ) {
      teamSvc.demoteUser(context.state.id, users[i].id).then((teamData) => {
        context.commit(mt.TEAM_LOAD_INFO, teamData)
      }).catch((err) => {
        context.commit(mt.MSG_ERROR, rootSvc.processError(err))
      })
    }
  }
}

export default {
  state,
  mutations,
  actions
}

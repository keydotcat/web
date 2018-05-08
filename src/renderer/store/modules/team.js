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
  },
  [mt.TEAM_LOAD_USERS] (state, payload) {
    if (state.id !== payload.team) {
      return
    }
    state.users = payload.users
  },
  [mt.TEAM_LOAD_VAULT] (state, payload) {
    if (state.id !== payload.team) {
      return
    }
    var newVault = payload.vault
    var vaults = []
    var added = false
    for (var vi = 0; vi < state.vaults.length; vi++ ) {
      if (state.vaults[vi].id === newVault.id) {
        added = true
        vaults.push(newVault)
      } else {
        var cloneVault = {}
        for (var k in state.vaults[vi]) {
          cloneVault[k] = state.vaults[vi][k]
        }
        vaults.push(cloneVault)
      }
    }
    if (!added) {
      vaults.push(newVault)
    }
    state.vaults = vaults
  }
}

const getters = {
  allUsersForTransfer (state, getters, rootState) {
    var me = rootState.user.id
    return state.users.map( (u) => {
      return {
        key: u.id,
        label: `${u.fullname} (${u.id})`,
        disabled: u.id === state.owner || u.id === me
      }
    })
  },
  usersForTransfer (state, getters, rootState) {
    var me = rootState.user.id
    return state.users.map( (u) => {
      return {
        key: u.id,
        label: `${u.fullname} (${u.id})`,
        disabled: u.admin || u.id === me
      }
    })
  }

}

function promoteUser(context, uid, pubKey, vaultKeys) {
  workerMgr.cipherVaultKeysForUser(vaultKeys, pubKey).then((userVaultKeys) => {
    teamSvc.promoteUser(context.state.id, uid, userVaultKeys).then((teamData) => {
      context.commit(mt.TEAM_LOAD_USERS, teamData)
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
        context.commit(mt.TEAM_LOAD_USERS, teamData)
      }).catch((err) => {
        context.commit(mt.MSG_ERROR, rootSvc.processError(err))
      })
    }
  },
  teamAddUsersToVault(context, { vaultId, users }) {
    var vaultKeys = {}
    for (var vi = 0; vi < users.length; vi++ ) {
      if (context.state.vaults[vi].id === vaultId) {
        vaultKeys[vaultId] = {
          publicKeys: context.state.vaults[vi].public_key,
          secretKeys: context.state.vaults[vi].key
        }
        break
      }
    }
    var promises = []
    for (var ui = 0; ui < users.length; ui++ ) {
      var genUK = (uid, pubKeys) => {
        return new Promise((resolve, reject) => {
          workerMgr.cipherVaultKeysForUser(vaultKeys, pubKeys).then((userVaultKeys) => {
            resolve({uid: uid, keys: userVaultKeys[vaultId]})
          })
        })
      }
      promises.push(genUK(users[ui].id, users[ui].public_key))
    }
    var tid = context.state.id
    Promise.all(promises).then((values) => {
      console.log(values)
      var userKeys = {}
      for (var i = 0; i < values.length; i++) {
        userKeys[values[i].uid] = values[i].keys
      }
      teamSvc.addUserToVault(tid, vaultId, userKeys).then((vaultData) => {
        context.commit(mt.TEAM_LOAD_VAULT, {team: tid, vault: vaultData})
      }).catch((err) => {
        context.commit(mt.MSG_ERROR, rootSvc.processError(err))
      })
    })
  },
  teamRemoveUsersFromVault(context, { vaultId, users }) {
    var tid = context.state.id
    for (var i = 0; i < users.length; i++ ) {
      teamSvc.removeUserFromVault(context.state.id, vaultId, users[i].id).then((vaultData) => {
        context.commit(mt.TEAM_LOAD_VAULT, {team: tid, vault: vaultData})
      }).catch((err) => {
        context.commit(mt.MSG_ERROR, rootSvc.processError(err))
      })
    }
  },
  teamCreateVault(context, name) {
    var admins = {}
    for (var ui = 0; ui < context.state.users.length; ui++ ) {
      if (context.state.users[ui].admin) {
        admins[context.state.users[ui].id] = context.state.users[ui].public_key
      }
    }
    var tid = context.state.id
    workerMgr.generateVaultKeys(admins).then((genKeys) => {
      var vaultKeys = {
        public_key: genKeys.publicKey,
        keys: genKeys.keys
      }
      teamSvc.createVault(context.state.id, name, vaultKeys).then((vaultData) => {
        context.commit(mt.TEAM_LOAD_VAULT, {team: tid, vault: vaultData})
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

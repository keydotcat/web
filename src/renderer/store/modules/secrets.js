import rootSvc from '@/services/root'
import teamSvc from '@/services/team'
import workerMgr from '@/worker/manager'
import * as mt from '@/store/mutation-types'
import Vue from 'vue'
import Secret from '@/classes/secret'
import SecretData from '@/classes/secret_data'

const state = () => {
  return {
    secrets: {},
    labels: {}
  }
}

function removeLabelsFromState(state, secret) {
  secret.data.labels.forEach((label) => {
    if(!(label in state.labels)) {
      return
    }
    var fullId = secret.fullId
    var fi = state.labels[label].indexOf(fullId)
    if(fi > -1) {
      state.labels[label].splice(fi, 1)
    }
    if(state.labels[label].length === 0) {
      Vue.delete(state.labels, label)
    }
  })
}

function addLabelsToState(state, secret) {
  secret.data.labels.forEach((label) => {
    if(!(label in state.labels)) {
      Vue.set(state.labels, label, [])
    }
    var fullId = secret.fullId
    var fi = state.labels[label].indexOf(fullId)
    if(fi === -1) {
      state.labels[label].push(fullId)
    }
  })
}

const mutations = {
  [mt.SECRET_SET] (state, {teamId, secret, openData}) {
    var secretObj = new Secret({
      secretId: secret.id,
      vaultId: secret.vault,
      teamId: teamId,
      vaultVersion: secret.vault_version,
      createdAt: secret.created_at,
      updatedAt: secret.updated_at,
      data: openData
    })
    if(secretObj.fullId in state.secrets) {
      removeLabelsFromState(state, secretObj)
    }
    Vue.set(state.secrets, secretObj.fullId, secretObj)
    addLabelsToState(state, secretObj)
  },
  [mt.SECRET_UNSET] (state, {teamId, vaultId, secretId}) {
    var sid = `${teamId}.${vaultId}.${secretId}`
    var secret = state.secrets[sid]
    removeLabelsFromState(state, secret)
    Vue.delete(state.secrets, sid)
  }
}

function filterPass( secret, filter ) {
  if( filter.labels && filter.labels.length > 0 ) {
    var found = secret.data.labels.filter( label => {
      return filter.labels.indexOf(label) > -1
    }).length > 0
    if( !found ) {
      return false
    }
  }
  if( filter.teams && filter.teams.length > 0 ) {
    if( filter.teams.indexOf(secret.teamId) === -1 ) {
      return false
    }
  }
  if( filter.vaults && filter.vaults.length > 0 ) {
    if( filter.vaults.indexOf( `${secret.teamId}/${secret.vaultId}` ) === -1 ) {
      return false
    }
  }
  return ( (!filter.seach || filter.search.length === 0) || ( secret.data.name || '' ).toLowerCase().indexOf( filter.search.toLowerCase() ) > -1 )
}

const getters = {
  filteredSecrets: state => {
    return filter => {
      var filtered = []
      for( var sid in state.secrets ) {
        if( filterPass( state.secrets[sid], filter ) ) {
          filtered.push( state.secrets[sid] )
        }
      }
      return filtered
    }
  },
  allLabels: state => {
    return Object.keys(state.labels).sort()
  }
}

var gVKeys = {}

function getVaultKeyFromList( vaults, tid, vid ) {
  var key = `${tid}.${vid}`
  if( !(key in gVKeys) ) {
    vaults.forEach((vault) => {
      if( vid === vault.id ) {
        gVKeys[key] = {
          publicKeys: vault.public_key,
          secretKeys: vault.key
        }
      }
    })
  }
  return gVKeys[key]
}

function updateOrCreate(context, ftor, tid, vid, sid, data) {
  return new Promise((resolve, reject) => {
    if(!(data instanceof SecretData)) {
      throw new Error('Expected SecretData object')
    }
    var vKeys = getVaultKeyFromList(context.rootState[`team.${tid}`].vaults, tid, vid)
    workerMgr.serializeAndClose(vKeys, data.cloneAsObject()).then((closedData) => {
      ftor({teamId: tid, vaultId: vid, secretId: sid, payload: closedData}).then((secret) => {
        workerMgr.openAndDeserialize(vKeys, secret.data).then((openData) => {
          context.commit(mt.SECRET_SET, {teamId: tid, secret: secret, openData: data})
          resolve(secret)
        })
      }).catch((err) => {
        context.commit(mt.MSG_ERROR, rootSvc.processError(err))
        reject(err)
      })
    })
  })
}

const actions = {
  loadSecretsFromTeam(context, { teamId, vaults }) {
    teamSvc.loadSecrets(teamId).then((resp) => {
      resp.secrets.forEach((secret) => {
        var vKeys = getVaultKeyFromList( vaults, teamId, secret.vault )
        workerMgr.openAndDeserialize(vKeys, secret.data).then((data) => {
          context.commit(mt.SECRET_SET, {teamId: teamId, secret: secret, openData: data})
        })
      })
    })
  },
  update(context, { teamId, vaultId, secretId, secretData }) {
    return updateOrCreate(context, teamSvc.updateSecret, teamId, vaultId, secretId, secretData)
  },
  create(context, { teamId, vaultId, secretData }) {
    return updateOrCreate(context, teamSvc.createSecret, teamId, vaultId, '', secretData)
  },
  delete(context, { teamId, vaultId, secretId }) {
    teamSvc.deleteSecret(teamId, vaultId, secretId).then((resp) => {
      context.commit(mt.SECRET_UNSET, {teamId: teamId, vaultId: vaultId, secretId: secretId})
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

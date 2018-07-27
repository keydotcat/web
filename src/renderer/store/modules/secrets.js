import rootSvc from '@/services/root'
import teamSvc from '@/services/team'
import workerMgr from '@/worker/manager'
import * as mt from '@/store/mutation-types'
import Vue from 'vue'
import { DateTime } from 'luxon'

const state = () => {
  return {
    secrets: {}
  }
}

const mutations = {
  [mt.SECRET_SET] (state, {teamId, secret, openData}) {
    var sid = `${teamId}.${secret.vault}.${secret.id}`
    Vue.set(state.secrets, sid, {
      id: secret.id,
      vaultId: secret.vault,
      teamId: teamId,
      data: openData,
      closed: secret.data,
      createdAt: DateTime.fromISO(secret.created_at),
      updatedAt: DateTime.fromISO(secret.updated_at),
      vaultVersion: secret.vault_version
    })
  }
}

function filterPass( secret, filter ) {
  if( filter.labels.length > 0 ) {
    var found = secret.data.labels.filter( label => {
      return filter.labels.indexOf(label) > -1
    }).length > 0
    if( !found ) {
      return false
    }
  }
  if( filter.teams.length > 0 ) {
    if( filter.teams.indexOf(secret.teamId) === -1 ) {
      return false
    }
  }
  if( filter.vaults.length > 0 ) {
    if( filter.vaults.indexOf( `${secret.teamId}/${secret.vaultId}` ) === -1 ) {
      return false
    }
  }
  return ( filter.search.length === 0 || secret.data.name.toLowerCase().indexOf( filter.search.toLowerCase() ) > -1 )
}

const getters = {
  filteredSecrets: state => {
    return filter => {
      console.log(filter)
      var filtered = []
      for( var sid in state.secrets ) {
        if( filterPass( state.secrets[sid], filter ) ) {
          filtered.push( state.secrets[sid] )
        }
      }
      return filtered
    }
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

const actions = {
  loadSecretsFromTeam(context, { teamId, vaults }) {
    teamSvc.loadSecrets(teamId).then((resp) => {
      resp.secrets.forEach((secret) => {
        var vKeys = getVaultKeyFromList( vaults, teamId, secret.vault )
        workerMgr.openAndDeserialize(vKeys, secret.data).then((data) => {
          context.commit(mt.SECRET_SET, {teamId: teamId, secret: secret, openData: data})
        })
      })
      //context.commit(mt.SECRET_LOAD_FROM_TEAM, {teamId: teamId, secrets: resp.secrets})
    })
  },
  createLocation(context, { vaultId, location }) {
    var vKeys = {}
    context.state.vaults.forEach((v) => {
      if ( v.id === vaultId ) {
        vKeys.publicKeys = v.public_key
        vKeys.secretKeys = v.key
      }
    })
    workerMgr.serializeAndClose(vKeys, location).then((data) => {
      teamSvc.createSecret(context.state.id, vaultId, data).then((secret) => {
        workerMgr.openAndDeserialize(vKeys, secret.data).then((data) => {
          context.commit(mt.SECRET_SET, {
            id: secret.id,
            data: data,
            closedData: secret.data,
            createdAt: secret.created_at,
            updatedAt: secret.updated_at,
            vaultVersion: secret.vault_version
          })
        })
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

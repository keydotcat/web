import workerMgr from '@/worker/manager'
import authSvc from '@/services/auth'
import * as mt from '@/store/mutation-types'

const state = {
  working: false,
  error: '',
  error_fields: {
    user_email: '',
    user_username: '',
    user_fullname: ''
  }
}

const mutations = {
  [mt.AUTH_REGISTERED] (state, payload) {
    state.working = false
    console.log('Registered!', payload)
  },
  [mt.AUTH_REGISTER_FAILURE] (state, payload) {
    state.working = false
    if(payload.data.error){
      console.log( 'erros is', payload.data.error )
      state.error = payload.error
    }
    if(payload.data.error_fields){
      for( var k in payload.data.error_fields ) {
        state.error_fields[k] = payload.data.error_fields[k]
      }
    }
    console.log('reg fail', state)
  },
  [mt.AUTH_START_WORK] (state) {
    state.working = true
    state.error = ''
    state.error_fields.user_email = ''
    state.error_fields.user_fullname = ''
    state.error_fields.user_username = ''
  }
}

const actions = {
  authRegister (context, payload) {
    context.commit(mt.AUTH_START_WORK)
    context.commit(mt.SESSION_SET_URL_ROOT, payload.urlRoot)
    workerMgr.generateUserKey(payload.username, payload.password).then((userData) => {
      var adminKeys = {}
      adminKeys[payload.username] = userData.publicKeys
      workerMgr.generateVaultKeys(adminKeys).then((vaultData) => {
        var registerPayload = {
          username: payload.username,
          password: userData.password,
          user_keys: userData.keys,
          email: payload.email,
          fullname: payload.fullname,
          vault_public_keys: vaultData.publicKey,
          vault_keys: vaultData.keys[payload.username]
        }
        authSvc.register(registerPayload)
          .then((response) => context.commit(mt.AUTH_REGISTERED, response))
          .catch((err) => context.commit(mt.AUTH_REGISTER_FAILURE, err.response))
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}

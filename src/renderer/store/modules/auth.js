import workerMgr from '@/worker/manager'
import authSvc from '@/services/auth'
import * as mt from '@/store/mutation-types'

const state = {
  working: false,
  registered: false,
  error: '',
  errorFields: {
    user_email: '',
    user_username: '',
    user_fullname: ''
  }
}

const mutations = {
  [mt.AUTH_REGISTERED] (state, payload) {
    state.working = false
    state.registered = true
  },
  [mt.AUTH_REGISTER_FAILURE] (state, payload) {
    state.working = false
    if(payload.data.error){
      console.log( 'erros is', payload.data.error )
      state.error = payload.data.error
    }
    if(payload.data.errorFields){
      for( var k in payload.data.errorFields ) {
        state.errorFields[k] = payload.data.errorFields[k]
      }
    }
    console.log('reg fail', state)
  },
  [mt.AUTH_START_WORK] (state) {
    state.working = true
    state.registered = false
    state.error = ''
    state.errorFields.user_email = ''
    state.errorFields.user_fullname = ''
    state.errorFields.user_username = ''
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

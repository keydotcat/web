import workerMgr from '@/worker/manager'
import authSvc from '@/services/auth'
import * as mt from '@/store/mutation-types'

const state = {
  error: ''
}

const mutations = {
  [mt.AUTH_REGISTERED] (state, payload) {
    console.log('Registered!', payload)
  },
  [mt.AUTH_REGISTER_FAILURE] (state, payload) {
    console.log('Could not register', payload)
  },
  [mt.AUTH_CLEAR_ERROR] (state) {
    state.error = ''
  }
}

const actions = {
  authRegister (context, payload) {
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
        console.log(registerPayload)
        authSvc.register(registerPayload)
          .then((response) => context.commit(mt.AUTH_REGISTERED, response))
          .catch((error) => context.commit(mt.AUTH_REGISTER_FAILURE, error))
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}

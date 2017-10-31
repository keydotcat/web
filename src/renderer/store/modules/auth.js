import workerMgr from '@/worker/manager'
import authSvc from '@/services/auth'
import * as mt from '@/store/mutation-types'

const state = {
  working: false,
  error: '',
  errorFields: {
    id: '',
    email: '',
    fullname: ''
  }
}

const mutations = {
  [mt.AUTH_REGISTERED] (state, payload, asd) {
    state.working = false
  },
  [mt.AUTH_REGISTER_FAILURE] (state, payload) {
    state.working = false
    if(payload.data.error){
      state.error = payload.data.error
    }
    if(payload.data.error_fields){
      for( var k in payload.data.error_fields ) {
        state.errorFields[k.substr(5)] = payload.data.error_fields[k]
      }
    }
  },
  [mt.AUTH_START_WORK] (state) {
    state.working = true
    state.registered = false
    state.error = ''
    state.errorFields.id = ''
    state.errorFields.email = ''
    state.errorFields.fullname = ''
  },
  [mt.AUTH_LOGIN_FAILURE] (state, payload) {
    state.working = false
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
          id: payload.username,
          password: userData.password,
          user_keys: userData.keys,
          email: payload.email,
          fullname: payload.fullname,
          vault_public_keys: vaultData.publicKey,
          vault_keys: vaultData.keys[payload.username]
        }
        authSvc.register(registerPayload)
          .then((response) => {
            context.commit(mt.AUTH_REGISTERED, response)
            context.commit(mt.MSG_INFO, 'register.done')
            context.commit(mt.PUBLIC_NAV_SET, 'register')
          })
          .catch((err) => context.commit(mt.AUTH_REGISTER_FAILURE, err.response))
      })
    })
  },
  authLogin (context, payload) {
    context.commit(mt.AUTH_START_WORK)
    workerMgr.hashPassword(payload.username, payload.password).then((hPass) => {
      authSvc.login({ id: payload.username, password: hPass })
        .then((response) => {
          console.log( 'Logged in', response)
        })
        .catch((err) => {
          var msg = err.response.data.error
          context.commit(mt.AUTH_LOGIN_FAILURE, err.response)
          context.commit(mt.MSG_ERROR, 'login.error.' + msg.toLowerCase().replace(new RegExp(' ', 'g'), '_'))
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}

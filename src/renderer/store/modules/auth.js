import workerMgr from '@/worker/manager'
import authSvc from '@/services/auth'
import rootSvc from '@/services/root'

import router from '@/router'
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
  [mt.AUTH_STOP_WORK] (state, payload, asd) {
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
            context.commit(mt.AUTH_STOP_WORK)
            context.commit(mt.MSG_INFO, 'register.done')
            router.push('/login')
          })
          .catch((err) => context.commit(mt.AUTH_REGISTER_FAILURE, err.response))
      })
    })
  },
  authLogin (context, payload) {
    context.commit(mt.AUTH_START_WORK)
    workerMgr.hashPassword(payload.username, payload.password).then((hPass) => {
      authSvc.login({ id: payload.username, password: hPass, want_csrf: true })
        .then((response) => {
          context.dispatch('sessionStoreServerSession', { sessionData: response, password: payload.password, csrf: response.csrf })
          context.commit(mt.AUTH_STOP_WORK)
          router.push('/home')
        }).catch((err) => {
          context.commit(mt.MSG_ERROR, rootSvc.processError(err, 'login.error.'))
          context.commit(mt.AUTH_STOP_WORK)
        })
    })
  },
  authConfirmEmail(context, payload) {
    context.commit(mt.AUTH_START_WORK)
    authSvc.confirmEmail({token: payload.token})
      .then((response) => {
        context.commit(mt.AUTH_STOP_WORK)
        context.commit(mt.MSG_INFO, 'confirm_email.done')
        router.push('/login')
      }).catch((err) => {
        context.commit(mt.AUTH_STOP_WORK)
        context.commit(mt.MSG_ERROR, rootSvc.processError(err))
      })
  }
}

export default {
  state,
  mutations,
  actions
}

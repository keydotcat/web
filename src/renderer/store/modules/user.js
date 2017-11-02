import rootSvc from '@/services/root'
import userSvc from '@/services/user'
import * as mt from '@/store/mutation-types'

const state = {
  teams: [],
  activeTeam: ''
}

const mutations = {
  [mt.USER_LOAD_INFO] (state, payload) {
    console.log( 'load user info from payload', payload)
  }
}

const actions = {
  userLoadInfo(context) {
    userSvc.loadInfo().then((info) => {
      context.commit(mt.USER_LOAD_INFO, info)
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

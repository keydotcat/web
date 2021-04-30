//JS Libs used for bootstrap
import 'jquery/dist/jquery.min.js'
import 'popper.js/dist/umd/popper.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

//Auto toast errors
import axios from 'axios'
import AutoToastSvc from '@/commonjs/wui/services/autotoast'

import KeyMgr from '@/commonjs/store/helpers/keymgrwrap'
import WorkerMgr from './worker/manager'

import store from '@/commonjs/store'

import Vue from 'vue'
import router from './router'
import App from './App'
import i18n from '@/commonjs/wui/i18n'

axios.defaults.withCredentials = 'include'
axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (err) {
    AutoToastSvc.toastAxiosError(err)
    return Promise.reject(err)
  }
)

//Use local keymanager
//TODO: Use webworkers here
KeyMgr.setInner(WorkerMgr)

//Load from storage if any
store.dispatch('session/loadFromLocalStorage')

//Run the wui
/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  i18n,
  router,
  template: '<App/>'
}).$mount('#app')

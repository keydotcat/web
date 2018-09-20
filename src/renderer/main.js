import Vue from 'vue'
import axios from 'axios'

import 'font-awesome/css/font-awesome.css'
import 'jquery/dist/jquery.min.js'
import 'popper.js/dist/umd/popper.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

import i18n from './i18n'
import router from './router'

import App from './App'
import store from './store'

import rootSvc from './services/root'

import utilSvc from './services/util'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

rootSvc.setHTTP(Vue.http)

axios.defaults.withCredentials = 'include'
axios.interceptors.response.use(
  function(response) {
    console.log('Got ok response', response)
    return response
  },
  function(err) {
    utilSvc.toastAxiosError(err)
    return Promise.reject(err)
  }
)

/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  i18n,
  router,
  template: '<App/>'
}).$mount('#app')

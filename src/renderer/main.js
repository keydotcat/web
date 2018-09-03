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

//global.jQuery = jquery
//window.$ = jquery

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

rootSvc.setHTTP(Vue.http)
if (process.env.IS_WEB) {
  rootSvc.setUrlRoot('/api')
} else {
  rootSvc.setUrlRoot('http://pen.key.cat/api')
}

axios.defaults.withCredentials = 'include'

//Vue.use(VueMaterial)

/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  i18n,
  router,
  template: '<App/>'
}).$mount('#app')

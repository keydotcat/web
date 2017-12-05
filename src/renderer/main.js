import Vue from 'vue'
import axios from 'axios'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'

import i18n from './i18n'
import router from './router'

import App from './App'
import store from './store'

import rootSvc from './services/root'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

rootSvc.setHTTP(Vue.http)
rootSvc.setUrlRoot('http://pen.key.cat/api')

Vue.use(VueMaterial)

/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  i18n,
  router,
  template: '<App/>'
}).$mount('#app')

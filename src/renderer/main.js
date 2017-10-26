import Vue from 'vue'
import axios from 'axios'
import VueI18n from 'vue-i18n'

import Element from 'element-ui'
import messages from './messages'

import App from './App'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages // set locale messages
})

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  i18n,
  template: '<App/>'
}).$mount('#app')

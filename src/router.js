import Vue from 'vue'
import VueRouter from 'vue-router'

import PublicDispatcher from '@/components/public-dispatcher'
import LoginPage from '@/components/public/login-page'
import RegisterPage from '@/components/public/register-page'
import ConfirmEmailPage from '@/components/public/confirm-email-page'
import ResendEmailPage from '@/components/public/resend-email-page'

//import store from '@/commonjs/store'

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    {
      path: '/',
      component: PublicDispatcher,
      children: [
        {
          path: 'login',
          name: 'login',
          component: LoginPage
        },
        {
          path: 'register',
          name: 'register',
          component: RegisterPage
        },
        {
          path: 'confirm_email',
          component: ConfirmEmailPage
        },
        {
          path: 'confirm_email/:token',
          component: ConfirmEmailPage
        },
        {
          path: 'resend_email',
          component: ResendEmailPage
        }
      ],
      redirect: '/login'
    }
  ]
})

/*
 * router.beforeEach((to, from, next) => {
  var isLogged = store.getters['session/loggedIn']
  if (to.path.indexOf('/home') === 0) {
    if (!isLogged) {
      next('/')
      return
    }
  } else {
    if (isLogged) {
      next('/home')
      return
    }
  }
  next()
})
*/

export default router

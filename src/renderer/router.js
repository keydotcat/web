import Vue from 'vue'
import VueRouter from 'vue-router'

import PublicDispatcher from '@/components/public_dispatcher'
import LoginPage from '@/components/public/login_page'
import RegisterPage from '@/components/public/register_page'
import ConfirmEmailPage from '@/components/public/confirm_email_page'
import ResendEmailPage from '@/components/public/resend_email_page'

import HomePage from '@/commonjs/wui/components/home-page'

import store from '@/commonjs/store'

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomePage
    },
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

router.beforeEach((to, from, next) => {
  var isLogged = store.getters['session/loggedIn']
  console.log('IS LOGGED IN', isLogged)
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

export default router

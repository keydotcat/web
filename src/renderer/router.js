import Vue from 'vue'
import VueRouter from 'vue-router'

import PublicDispatcher from '@/components/public_dispatcher'
import LoginPage from '@/components/public/login_page'
import RegisterPage from '@/components/public/register_page'
import ConfirmEmailPage from '@/components/public/confirm_email_page'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/',
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
          path: 'confirm_email/:token',
          component: ConfirmEmailPage
        }
      ],
      redirect: '/login'
    }
  ]
})

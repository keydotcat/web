import VueRouter from 'vue-router'

import PublicDispatcher from '@/components/public_dispatcher'
import LoginPage from '@/components/public/login_page'
import RegisterPage from '@/components/public/register_page'

export default new VueRouter({
  routes: [
    { path: '/',
      component: PublicDispatcher,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: 'login',
          name: 'login',
          component: LoginPage
        },
        {
          // UserPosts will be rendered inside User's <router-view>
          // when /user/:id/posts is matched
          path: 'register',
          name: 'register',
          component: RegisterPage
        }
      ],
      redirect: '/login'
    }
  ]
})

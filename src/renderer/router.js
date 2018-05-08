import Vue from 'vue'
import VueRouter from 'vue-router'

import PublicDispatcher from '@/components/public_dispatcher'
import LoginPage from '@/components/public/login_page'
import RegisterPage from '@/components/public/register_page'
import ConfirmEmailPage from '@/components/public/confirm_email_page'

import HomeDispatcher from '@/components/home_dispatcher'
import HomeLoader from '@/components/home_loader'

//import ManagePage from '@/components/home/manage_page'
import NewTeamPage from '@/components/home/new_team_page'
import ManageUsersPage from '@/components/home/manage/users_page'
import ManageVaultsPage from '@/components/home/manage/vaults_page'
//import ContentsPage from '@/components/home/contents_page'

import rootSvc from '@/services/root'

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    { path: '/home',
      name: 'home',
      component: HomeLoader,
      children: [
        {
          path: 'new_team',
          component: NewTeamPage
        },
        { path: 'team/:tid',
          component: HomeDispatcher,
          redirect: '/home/team/:tid/dashboard',
          children: [
            { path: 'dashboard', component: ManageUsersPage },
            { path: 'users', component: ManageUsersPage },
            { path: 'vaults', component: ManageVaultsPage }
          ]
        }
      ]
    },
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

router.beforeEach((to, from, next) => {
  var isLogged = rootSvc.isLoggedIn()
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

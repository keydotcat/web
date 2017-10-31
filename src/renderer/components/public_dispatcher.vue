<template>
  <div class="expandHeight">
    <el-header>
      <el-menu :default-active="activePage"  mode="horizontal" @select="handleSelect">
        <el-menu-item class="goright" index="register">Register</el-menu-item>
        <el-menu-item class="goright" index="login">Login</el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="expandHeight">
      <msg-display></msg-display>
      <login-page v-if="activePage == 'login'"></login-page>
      <register-page v-if="activePage == 'register'"></register-page>
    </el-main>
  </div>
</template>

<script>
  import LoginPage from '@/components/public/login_page'
  import RegisterPage from '@/components/public/register_page'
  import MsgDisplay from '@/components/msg_display'
  import * as mt from '@/store/mutation-types'

  export default {
    name: 'public-dispatcher',
    components: { LoginPage, RegisterPage, MsgDisplay },
    methods: {
      handleSelect (key, keyPath) {
        this.$store.commit( mt.PUBLIC_NAV_SET, key )
      }
    },
    computed: {
      activePage () {
        return this.$store.state.public_nav.page
      }
    }
  }
</script>

<style>
  .el-menu > .goright {
    float: right !important;
  }
</style>

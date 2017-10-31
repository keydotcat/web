<template>
  <div class="expandHeight">
    <el-header>
      <el-menu :router="true" :default-active='activePage' mode="horizontal">
        <el-menu-item class="goright" index="/register">Register</el-menu-item>
        <el-menu-item class="goright" index="/login">Login</el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="expandHeight">
      <msg-display></msg-display>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
  import LoginPage from '@/components/public/login_page'
  import RegisterPage from '@/components/public/register_page'
  import MsgDisplay from '@/components/msg_display'

  export default {
    name: 'public-dispatcher',
    components: { LoginPage, RegisterPage, MsgDisplay },
    computed: {
      activePage () {
        return this.$route.path
      }
    }
  }
</script>

<style>
  .el-menu > .goright {
    float: right !important;
  }
</style>

<template>
  <div class="expandHeight">
    <el-header>
      <el-menu :default-active="activePage"  mode="horizontal" @select="handleSelect">
        <el-menu-item class="goright" index="register">Register</el-menu-item>
        <el-menu-item class="goright" index="login">Login</el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="expandHeight">
      <login-page v-if="activePage == 'login'"></login-page>
    </el-main>
  </div>
</template>

<script>
  import LoginPage from '@/components/public/login_page'

  export default {
    name: 'public-dispatcher',
    components: { LoginPage },
    data: () => {
      return {
        activePage: 'login'
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        this.activePage = key
      }
    }
  }
</script>

<style>
  .el-menu > .goright {
    float: right !important;
  }
</style>

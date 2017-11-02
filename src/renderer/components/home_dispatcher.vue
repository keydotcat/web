<template>
  <div class="expandHeight">
    <el-header>
      <el-menu :router="true" :default-active='activePage' mode="horizontal">
        <el-menu-item class="goright" index="/you">You</el-menu-item>
        <el-menu-item class="goright" index="/register">Register</el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="expandHeight">
      <msg-display></msg-display>
      hello
    </el-main>
  </div>
</template>

<script>
  import MsgDisplay from '@/components/msg_display'

  export default {
    name: 'home-dispatcher',
    components: { MsgDisplay },
    beforeMount() {
      this.$store.dispatch('userLoadInfo')
    },
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
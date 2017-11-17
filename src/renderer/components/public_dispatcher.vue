<template>
  <div class="expandHeight">
    <md-tabs class="md-accent" md-alignment="right" md-sync-route>
      <md-tab id="tab-login" to="/login" :md-label="$t('login.send')"></md-tab>
      <md-tab id="tab-register" to="/register" :md-label="$t('register.send')"></md-tab>
    </md-tabs>
    <div class="expandHeight">
      <msg-display></msg-display>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import MsgDisplay from '@/components/msg_display'

  export default {
    name: 'public-dispatcher',
    components: { MsgDisplay },
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

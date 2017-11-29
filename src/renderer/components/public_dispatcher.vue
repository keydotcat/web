<template>
  <div class="expandHeight">
    <md-toolbar class="md-accent" md-elevation="1">
      <h3 class="md-title" style="flex: 1">Key.cat</h3>
      <md-button class="md-accent" v-bind:class="{ 'md-raised': activePage == 'login' }" @click="goto('login')">{{$t('login.send')}}</md-button>
      <md-button class="md-accent" v-bind:class="{ 'md-raised': activePage == 'register' }" @click="goto('register')">{{$t('register.send')}}</md-button>
      </md-toolbar>
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
    methods: {
      goto( where ) {
        this.$router.push( `/${where}` )
      }
    },
    computed: {
      activePage () {
        return this.$route.name
      }
    }
  }
</script>

<style>
  .el-menu > .goright {
    float: right !important;
  }
</style>

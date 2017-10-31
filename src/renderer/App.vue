<template>
  <div class="expandHeight">
    <router-view></router-view>
  </div>
</template>

<script>
  import 'element-ui/lib/theme-chalk/index.css'
  import * as mt from '@/store/mutation-types'

  export default {
    name: 'keycat',
    beforeCreate () {
      this.$store.commit(mt.SESSION_LOAD_STATE_FROM_STORAGE)
    },
    computed: {
      loggedIn: () => {
        return this.$store.session.sessionToken.length > 0
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');

  html, body {
    font-family: 'Open Sans',serif;
    height: 100%;
  }
  
  .expandHeight{
    height: 100%;
  }
  /* CSS */
</style>

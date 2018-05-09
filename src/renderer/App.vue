<template>
  <router-view></router-view>
</template>

<script>
  import * as mt from '@/store/mutation-types'

  export default {
    name: 'keycat',
    beforeCreate () {
      this.$store.commit(mt.SESSION_LOAD_STATE_FROM_STORAGE)
      this.$store.dispatch('sessionLoadFromLocalStorage')
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import '~bootstrap/dist/css/bootstrap.min.css';

  html, body {
    /*font-family: 'Open Sans',serif;*/
    height: 100%;
  }
  
  .expandHeight{
    height: 100%;
  }

  .fas {
    font-family: 'FontAwesome';
    font-style: normal;
  }
  /* CSS */
</style>

<template>
  <div class="expandHeight">
    <div v-if="loading" class="expandHeight d-flex justify-content-center align-items-center">
      <h1 class="display-4">We're loading!</h1>
    </div>
    <router-view v-if="!loading"></router-view>
  </div>
</template>

<script>
  import * as mt from '@/store/mutation-types'

  export default {
    name: 'keycat',
    beforeCreate () {
      this.$store.commit(mt.SESSION_SET_LOADING, true)
      this.$store.dispatch('sessionLoadFromLocalStorage')
    },
    computed: {
      loading() {
        return this.$store.state.session.loading
      }
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import '~bootstrap/dist/css/bootstrap.min.css';
  @import '~izitoast/dist/css/iziToast.min.css';

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

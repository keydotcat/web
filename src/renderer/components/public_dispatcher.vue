<template>
  <div class='expandHeight'>
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <h5 class="my-0 mr-md-auto font-weight-normal">Key cat</h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <a class="p-2 text-dark" href="#">Info</a>
        <a class="p-2 text-dark" href="#" @click="goto('login')">Login</a>
      </nav>
      <a class="btn btn-outline-primary" href="#" @click="goto('register')">Sign up</a>
    </div>
    <div class='expandHeight'>
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

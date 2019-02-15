<template>
  <div class="expandHeight">
    <nav class="navbar navbar-expand-sm navbar-light bg-white border-bottom clearfix mb-4">
      <a class="navbar-brand d-flex" href="#"><img class="navico mr-2" src="/favicon.ico" />KeyCat</a>
      <button
        class="navbar-toggler ml-auto"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item mr-2">
            <a href="#" class="nav-link text-dark" @click="goto('login')">Login</a>
          </li>
          <li class="nav-item">
            <a class="btn btn-outline-primary" href="#" @click="goto('register')">Sign up</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="expandHeight">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'public-dispatcher',
  methods: {
    goto(where) {
      this.$router.push(`/${where}`)
    }
  },
  computed: {
    activePage() {
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

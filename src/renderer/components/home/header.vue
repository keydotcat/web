<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light clearfix">
    <a class="navbar-brand" href="#">Key cat</a>
    <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" :class="{'active': activePage == 'data' }">
          <a href="#" class="nav-link" @click="goto('data')">
            Your data
            <span class="sr-only" v-if="activePage=='data'">(current)</span>
          </a>
        </li>
        <li class="nav-item" :class="{'active': activePage == 'manage' }">
          <a href="#" class="nav-link" @click="goto('manage')">
            {{$t('configure')}}
            <span class="sr-only" v-if="activePage=='manage'">(current)</span>
          </a>
        </li>
        <!--li class="nav-item">
          <a class="dropdown-item" href="#" @click="goto('new_team')">{{$t('create_new_team')}}</a>
        </li-->
        <li class="nav-item">
          <a href="#" class="nav-link" @click="logout()">
            {{$t('logout')}}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'home-header',
    methods: {
      logout() {
        this.$store.dispatch('sessionLogout')
      },
      goto( where ) {
        this.$router.push( `/home/${where}` )
      }
    },
    computed: {
      activePage () {
        var sp = this.$route.path.split('/').filter( x => x.length > 0 )
        return sp.length > 1 ? sp[1] : ''
      }
    }
  }
</script>

<style>
</style>
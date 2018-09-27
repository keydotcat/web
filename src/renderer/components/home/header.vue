<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light clearfix">
    <a class="navbar-brand" href="#">Key cat</a>
    <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <span class="switch switch-sm nav-link">
            <input type="checkbox" v-model="enableAutoLogout" class="switch" id="switch-id">
            <label class="m-0"for="switch-id">Auto-logout</label>
          </span>
        </li>
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
  //import toggle from 'bootstrap-toggle'

  export default {
    name: 'home-header',
    data() {
      return {
        idleMinutes: 1,
        enableAutoLogout: true
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('sessionLogout')
      },
      goto( where ) {
        this.$router.push( `/home/${where}` )
      }
    },
    mounted() {
      var timer
      var self = this

      function autoLogout() {
        if( self.enableAutoLogout ) {
          self.logout()
        }
      }

      function resetTimer() {
        clearTimeout(timer)
        timer = setTimeout(autoLogout, Math.ceil(self.idleMinutes * 60000))
      }

      document.onmousemove = resetTimer
      document.onkeypress = resetTimer
      resetTimer()
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
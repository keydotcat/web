<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light clearfix">
    <a class="navbar-brand" href="#">Key cat</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" :class="{'active': activePage == 'contents' }">
          <a href="#" class="nav-link" @click="goto('contents')">
            {{$t('team') + ' ' + $store.getters.activeTeam.name}}
            <span class="sr-only" v-if="activePage=='contents'">(current)</span>
          </a>
        </li>
        <li class="nav-item" :class="{'active': activePage == 'manage' }">
          <a href="#" class="nav-link" @click="goto('manage')">
            {{$t('configure')}}
            <span class="sr-only" v-if="activePage=='manage'">(current)</span>
          </a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{$t('select_team')}}</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" v-for="team in $store.getters.nonActiveTeams" :key='team.id' @click="set_team(team.id)">{{team.name}}</a>
            <div class="dropdown-divider" v-if="$store.getters.nonActiveTeams.length > 0"></div>
            <a class="dropdown-item" href="#" @click="goto('new_team')">{{$t('create_new_team')}}</a>
          </div>
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
      set_team( teamId ) {
        this.$router.push( `/home/team/${teamId}` )
      },
      goto( where ) {
        switch(where){
          case 'new_team':
            this.$router.push( `/home/${where}` )
            break
          default:
            this.$router.push( `/home/team/${this.$store.getters.activeTeam.id}/${where}` )
        }
      }
    },
    computed: {
      activePage () {
        var sp = this.$route.path.split('/').filter( x => x.length > 0 )
        return sp.length > 2 ? sp[2] : ''
      }
    }
  }
</script>

<style>
</style>
<template>
		<div class="mt-3">
				<nav class="navbar navbar-expand-lg navbar-light bg-transparent border-bottom">
      <a class="navbar-brand" href="#">Team {{$store.getters[`team.${$route.params.tid}/name`]}}</a>
						<ul class="navbar-nav">
								<li class="nav-item" :class="{'active': activePage == 'users'}">
										<a class="nav-link" @click="goto('users')" href="#">Users</a>
								</li>
								<li class="nav-item">
										<a class="nav-link" @click="goto('vaults')" href="#">Vaults</a>
								</li>
						</ul>
				</nav>
    <router-view></router-view>
		</div>
</template>

<script>
  export default {
    name: 'manage-team-content',
    watch: {
      '$route' (to, from) {
        if(to.params.tid !== from.params.tid){
          this.goto('users')
        }
      }
    },
    beforeMount() {
      this.goto('users')
    },
    computed: {
      activePage () {
        var sp = this.$route.path.split('/').filter( x => x.length > 0 )
        return sp.length > 1 ? sp[sp.length - 1] : ''
      }
    },
    methods: {
      goto( where ) {
        this.$router.push( `/home/manage/team/${this.$route.params.tid}/${where}` )
      }
    }
  }
</script>

<style>
</style>


<template>
  <div class="expandHeight">
    <md-toolbar class="md-accent" md-elevation="1">
      <h3 class="md-title" style="flex: 1">Key.cat</h3>
      <md-button class="md-raised md-accent" @click="goto('contents')">{{$t('team') + ' ' + $store.getters.activeTeam.name}}</md-button>
      <md-button class="md-raised md-accent" @click="goto('manage')">{{$t('configure')}}</md-button>
      <md-menu md-size="auto" md-align-trigger>
        <md-button md-menu-trigger>{{$t('select_team')}}</md-button>

        <md-menu-content>
          <md-menu-item>My Item 1</md-menu-item>
          <md-menu-item>This content is long enough</md-menu-item>
          <md-menu-item>My Item 3</md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-toolbar>
    <!--el-header>
    <el-menu :router='true' :default-active='activePage' mode="horizontal">
      <el-menu-item class="goright" index="/logout" @click='logout'>{{$t('logout')}}</el-menu-item>
      <el-menu-item class="goright" index="/you">{{$store.state.user.fullname}}</el-menu-item>
      <el-submenu index="2" class="goright">
        <template slot="title">{{$t('select_team')}}</template>
        <el-menu-item v-for="team in $store.getters.nonActiveTeams" :key='team.id' :index="'/home/'+team.id">{{team.name}}</el-menu-item>
        <hr v-if="$store.getters.nonActiveTeams.length > 0"/>
        <el-menu-item index='create_new_team' class='centerer'>
          <el-button type="primary" @click='newTeamDialogVisible=true'>{{$t('create_new_team')}}</el-button>
        </el-menu-item>
      </el-submenu>
      <el-menu-item class="goright" :index="'/home/'+$store.getters.activeTeam.id+'/manage'">{{$t('configure')}}</el-menu-item>
      <el-menu-item class="goright" :index="'/home/'+$store.getters.activeTeam.id+'/contents'">{{$t('team') + ' ' + $store.getters.activeTeam.name}}</el-menu-item>
    </el-menu>
  </el-header>
  <el-main class="expandHeight">
    <msg-display></msg-display>
    <new-team-dialog :visible='newTeamDialogVisible' v-on:hide='newTeamDialogVisible=false'></new-team-dialog>
    <router-view></router-view>
    </el-main-->
  </div>
</template>

<script>
  import MsgDisplay from '@/components/msg_display'
  import NewTeamDialog from '@/components/home/new_team_dialog'
  import * as mt from '@/store/mutation-types'

  export default {
    name: 'home-dispatcher',
    components: { MsgDisplay, NewTeamDialog },
    data () {
      return {
        newTeamDialogVisible: false
      }
    },
    beforeMount () {
      var tid = this.$route.params.tid
      if (this.$store.state.team.id !== tid) {
        this.$store.dispatch('teamLoadInfo', this.$route.params.tid)
      }
    },
    watch: {
      '$route' (to, from) {
        if( this.$store.getters.activeTeam.id !== this.$route.params.tid ) {
          this.$store.commit(mt.USER_SET_ACTIVE_TEAM, this.$route.params.tid)
          this.$store.dispatch('teamLoadInfo', this.$route.params.tid)
        }
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('sessionLogout')
      }
    },
    computed: {
      activePage () {
        return this.$route.path
      }
    }
  }
</script>

<style>
  .el-menu > .goright {
    float: right !important;
  }

  .centerer {
    display: flex;
    justify-content: center; /* align horizontal */
    align-items: center;
  }
</style>
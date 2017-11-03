<template>
  <div class="expandHeight">
    <el-header>
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
      hello
    </el-main>
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
    watch: {
      '$route' (to, from) {
        if( this.$store.getters.activeTeam.id !== this.$route.params.tid ) {
          this.$store.commit(mt.USER_SET_ACTIVE_TEAM, this.$route.params.tid)
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
<template>
  <div class="expandHeight">
    <home-header></home-header>
    <msg-display></msg-display>
    <home-content></home-content>
  </div>
</template>

<script>
  import MsgDisplay from '@/components/msg_display'
  import HomeHeader from '@/components/home/header'
  import HomeContent from '@/components/home/content'
  import * as mt from '@/store/mutation-types'

  export default {
    name: 'home-dispatcher',
    components: { MsgDisplay, HomeHeader, HomeContent },
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
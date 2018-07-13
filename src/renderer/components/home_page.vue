<template>
  <div class="expandHeight">
    <home-header></home-header>
    <msg-display></msg-display>
    <router-view></router-view>
  </div>
</template>

<script>
  import MsgDisplay from '@/components/msg_display'
  import HomeHeader from '@/components/home/header'

  export default {
    name: 'home-page',
    components: { MsgDisplay, HomeHeader },
    beforeMount() {
      if (this.$store.state.user.id.length === 0) {
        this.$store.dispatch('user/loadInfo')
      }
    }
  }
</script>

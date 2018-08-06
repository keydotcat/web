<template>
  <div class="expandHeight">
    <home-header></home-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import HomeHeader from '@/components/home/header'

  export default {
    name: 'home-page',
    components: { HomeHeader },
    beforeMount() {
      if (this.$store.state.user.id.length === 0) {
        this.$store.dispatch('user/loadInfo')
      }
    }
  }
</script>

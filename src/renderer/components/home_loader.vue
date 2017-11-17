<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'home-loader',
    beforeMount() {
      if (this.$store.state.user.id.length === 0) {
        this.$store.dispatch('userLoadInfo')
      }
    }
  }
</script>

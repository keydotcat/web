<template>
  <div>
    <div class="header px-3 py-3 pt-md-5 pb-md-4 d-flex justify-content-between">
      <h3 class="display-9">Locations</h3>
      <div class="input-group w-25 text-right d-flex flex-row-reverse">
          <button class="btn btn-primary" type="button" @click="createLocation">New location</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'locations-page',
    data () {
      return {}
    },
    methods: {
      createLocation () {
        this.$router.push( `/home/data/new_location` )
      }
    }
  }
</script>


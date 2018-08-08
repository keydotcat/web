<template>
  <div>
    <div class="header px-3 py-3 pt-md-5 pb-md-4 d-flex justify-content-between">
      <h3 class="display-9">User's information</h3>
    </div>
    <div class="card">
      <div class="card-body">
        <h6 class="card-title">Name</h6> 
        <p class="ml-2">{{$store.state.user.fullname}} ({{$store.state.user.id}})</p>
        <h6 class="card-title">Email</h6> 
        <p class="ml-2">{{$store.state.user.email}}</p>
      </div>
    </div>
    <div class="card mt-2">
      <div class="card-body">
        <h6 class="card-title">Change email</h6> 
        <form>
          <div class="form-group">
            <label for="email1">New email address</label>
            <input type="email" class="form-control" v-model="newEmail" id="email1" placeholder="Enter new email">
          </div>
          <button type="submit" class="btn btn-primary float-right" @click="requestEmailChange">Submit</button>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        newEmail: ''
      }
    },
    methods: {
      requestEmailChange() {
        this.$store.dispatch('user/changeEmail', this.newEmail)
      }
    }
  }
</script>

<style>
</style>


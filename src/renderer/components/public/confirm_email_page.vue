<template>
  <div class="expandHeight centerFlex">
    <form class="form-login" @submit="onSubmit">
      <h1 class="h3 mb-3 font-weight-normal">{{$t('confirm_email.title')}}</h1>
      <div class="form-group">
        <label>{{$t('confirm_email.token')}}</label>
        <input class="form-control" v-model="form.token" autofocus>
      </div>
      <button class="btn btn-lg btn-primary btn-block" :disabled="working" type="submit">{{$t('send')}}</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'confirm-email-page',
    data () {
      return {
        form: {
          token: ''
        }
      }
    },
    mounted () {
      let params = this.$route.params
      if('token' in params && params.token.length > 0) {
        this.form.token = params.token
        this.$store.dispatch('authConfirmEmail', this.form)
      }
    },
    computed: {
      working () {
        return this.$store.state.auth.working
      }
    },
    methods: {
      onSubmit (e, v) {
        this.$store.dispatch('authConfirmEmail', this.form)
      }
    }
  }
</script>

<style>
  .centerFlex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

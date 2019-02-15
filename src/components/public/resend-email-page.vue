<template>
  <div class="expandHeight centerFlex">
    <form class="form-login" @submit="onSubmit">
      <h1 class="h3 mb-3 font-weight-normal">{{ $t('resend_email.title') }}</h1>
      <div class="form-group">
        <label>{{ $t('fields.email') }}</label>
        <input class="form-control" v-model="form.email" autofocus />
      </div>
      <button class="btn btn-lg btn-primary btn-block" :disabled="working" type="submit">{{ $t('send') }}</button>
    </form>
  </div>
</template>

<script>
import toast from '@/commonjs/wui/services/toast'

export default {
  name: 'resend-email-page',
  data() {
    return {
      form: {
        email: ''
      }
    }
  },
  computed: {
    working() {
      return this.$store.state.public.working
    }
  },
  methods: {
    onSubmit(e, v) {
      e.preventDefault()
      this.$store.dispatch('public/resendConfirmEmail', this.form).then(() => {
        toast.success('resend_email.done')
      })
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

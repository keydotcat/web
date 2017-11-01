<template>
  <div class="expandHeight centerFlex">
    <el-form ref="form" :rules="rules" :model="form" label-width="200px">
      <p>{{$t('confirm_email.title')}}</p>
      <el-form-item :label="$t('confirm_email.token')" prop="token">
        <el-input v-model="form.token"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="working" :disabled="working">{{$t('send')}}</el-button>
      </el-form-item>
    </el-form>
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

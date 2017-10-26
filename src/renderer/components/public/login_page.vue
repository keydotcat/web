<template>
  <div class="expandHeight centerFlex">
    <el-form ref="form" :rules="rules" :model="form" label-width="200px">
      <p>{{$t('register.welcome')}}</p>
      <el-form-item :label="$t('register.username')" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('register.fullname')" prop="fullname">
        <el-input v-model="form.fullname"></el-input>
      </el-form-item>
      <el-form-item :label="$t('register.email')" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item :label="$t('register.password')" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item :label="$t('register.repeatPassword')" prop="password2">
        <el-input v-model="form.password2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="working" :disabled="working">{{$t('register.send')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'login-page',
    data () {
      var checkField = (rule, value, callback) => {
        if (!value || value.length < 3 || value.length > 20) {
          callback(new Error(this.$i18n.t(`register.error.${rule.field}`)))
        }
      }
      var checkPasswordsMatch = (rule, value, callback) => {
        if (value !== this.form.password) {
          callback(new Error(this.$i18n.t('register.error.password2')))
        }
      }
      return {
        form: {
          username: '',
          fullname: '',
          email: '',
          password: '',
          urlRoot: process.env.NODE_ENV === 'development' ? 'http://localhost:27312' : 'https://pen.key.cat/api'
        },
        working: false,
        rules: {
          username: [
            { validator: checkField, trigger: 'blur' }
          ],
          fullname: [
            { validator: checkField, trigger: 'blur' }
          ],
          email: [
            { validator: checkField, trigger: 'blur' }
          ],
          password: [
            { validator: checkField, trigger: 'blur' }
          ],
          password2: [
            { validator: checkPasswordsMatch, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmit (e, v) {
        this.working = true
        this.$store.dispatch('sessionLogin', this.form)
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

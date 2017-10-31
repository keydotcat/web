<template>
  <div class="expandHeight centerFlex">
    <el-form ref="form" :rules="rules" :model="form" label-width="200px">
      <p>{{$t('register.welcome')}}</p>
      <el-form-item :label="$t('register.username')" :error='usernameSrvError' prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('register.fullname')" :error='fullnameSrvError' prop="fullname">
        <el-input v-model="form.fullname"></el-input>
      </el-form-item>
      <el-form-item :label="$t('register.email')" :error='emailSrvError' prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item :label="$t('register.password')" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item :label="$t('register.repeatPassword')" prop="password2">
        <el-input type="password" v-model="form.password2"></el-input>
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
          username: 'asd',
          fullname: 'asd',
          email: 'asd@asd.com',
          password: 'asd',
          urlRoot: process.env.NODE_ENV === 'development' ? 'http://localhost:23764' : 'https://pen.key.cat/api'
        },
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
    computed: {
      working () {
        return this.$store.state.auth.working
      },
      emailSrvError () {
        if (this.$store.state.auth.errorFields.user_email) {
          return this.$t('register.error.email')
        }
        return ''
      },
      usernameSrvError () {
        var authState = this.$store.state.auth
        if (authState.errorFields.user_username) {
          return this.$t('register.error.username')
        } else if(authState.error ) {
          return this.$t('register.error.' + authState.error.toLowerCase().replace(' ', '_'))
        }
        return ''
      },
      fullnameSrvError () {
        if (this.$store.state.auth.errorFields.user_fullname) {
          return this.$t('register.error.fullname')
        }
        return ''
      }
    },
    methods: {
      onSubmit (e, v) {
        this.$store.dispatch('authRegister', this.form)
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

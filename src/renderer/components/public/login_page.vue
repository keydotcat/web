<template>
  <div class="expandHeight centerFlex">
    <el-form ref="form" :rules="rules" :model="form" label-width="200px">
      <p>{{$t('login.welcome')}}</p>
      <el-form-item :label="$t('register.username')" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('register.password')" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="working" :disabled="working">{{$t('login.send')}}</el-button>
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
      return {
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { validator: checkField, trigger: 'blur' }
          ],
          password: [
            { validator: checkField, trigger: 'blur' }
          ]
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
        this.$store.dispatch('authLogin', this.form)
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

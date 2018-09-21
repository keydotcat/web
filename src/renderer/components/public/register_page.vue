<template>
  <div class="expandHeight centerFlex">
    <form class="form-login" @submit="submit">
      <h1 class="h3 mb-3 font-weight-normal">{{$t('register.welcome')}}</h1>
      <template v-for="(val,field) in static_errors">
        <div class="form-group">
          <label :for="field">{{$t('fields.' + field)}}</label>
          <input :type="field.indexOf('password') == 0 ? 'password' : ''" v-model="form[field]" :disabled="working" @change="setDirty(field)" class="form-control" :class="{'is-invalid':(errs[field].length>0)}"/>
          <div class="invalid-feedback">{{errs[field]}}</div>
        </div>
      </template>
      <button class="btn btn-lg btn-primary btn-block" :disabled="working" type="submit">{{$t('register.send')}}</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'register-page',
    data () {
      var data = {
        form: {
          urlRoot: this.$store.state.session.urlRoot
        },
        dirty: {},
        static_errors: {}
      }
      var fields = [ 'username', 'fullname', 'email', 'password', 'password_repeat' ]
      for( var i = 0; i < fields.length; i++ ) {
        var f = fields[i]
        data.form[f] = ''
        data.dirty[f] = false
        data.static_errors[f] = ''
      }
      return data
    },
    computed: {
      working () {
        return this.$store.state.auth.working
      },
      emailError () {
        switch (this.$store.state.auth.errorFields.email) {
          case 'invalid':
            return this.$t('register.error.email')
          case 'duplicate':
            return this.$t('register.error.duplicate')
        }
        return this.static_errors.email
      },
      usernameError () {
        var authState = this.$store.state.auth
        switch (authState.errorFields.id) {
          case 'invalid':
            return this.$t('register.error.username')
          case 'duplicate':
            return this.$t('register.error.duplicate')
        }
        return this.static_errors.username
      },
      fullnameError () {
        if (this.$store.state.auth.errorFields.fullname) {
          return this.$t('register.error.fullname')
        }
        return this.static_errors.fullname
      },
      errs () {
        return {
          username: this.usernameError,
          email: this.emailError,
          fullname: this.fullnameError,
          password: this.static_errors.password,
          password_repeat: this.static_errors.password_repeat
        }
      }
    },
    methods: {
      getValidationClass (fn) {
        return {
          'md-invalid': this.errs[fn].length > 0
        }
      },
      setDirty(fieldName) {
        this.dirty[fieldName] = true
      },
      submit (e, v) {
        e.preventDefault()
        const form = this.form
        var errFound = false
        for( var k in this.form ) {
          if( k === 'urlRoot' ) {
            continue
          }
          this.static_errors[k] = ''
          if (k !== 'password_repeat' && form[k].length < 3) {
            this.static_errors[k] = this.$i18n.t('errors.invalid_' + k)
            errFound = true
          }
        }
        if( form.password_repeat !== form.password) {
          this.static_errors.password_repeat = this.$i18n.t('errors.invalid_password_repeat')
          errFound = true
        }
        if( errFound ){
          return errFound
        }
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

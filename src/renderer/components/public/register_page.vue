<template>
  <div class="expandHeight centerFlex">
    <form novalidate class="md-layout-row md-gutter centerFlex" @submit="submit">
      <md-card class="md-flex-50 md-flex-small-100">
        <md-card-header>
          <div class="md-title">{{$t('register.welcome')}}</div>
        </md-card-header>
        <md-card-content>
          <template v-for="(val,field) in static_errors">
            <md-field :class="getValidationClass(field)">
              <label :for="field">{{$t('fields.' + field)}}</label>
              <md-input :type="field.indexOf('password') == 0 ? 'password' : ''" v-model="form[field]" :disabled="working" @change="setDirty(field)"/>
              <span class="md-error" :v-if="errs[field].length > 0">{{errs[field]}}</span>
            </md-field>
          </template>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="working" />
        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="working">{{$t('login.send')}}</md-button>
        </md-card-actions>
      </md-card>
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
        if(authState.error) {
          return this.$t('errors.' + authState.error.toLowerCase().replace(' ', '_'))
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

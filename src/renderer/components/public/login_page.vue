<template>
  <div class='expandHeight centerFlex'>
    <form class="form-signin" novaiidate @submit="submit">
      <h1 class="h3 mb-3 font-weight-normal">{{$t('login.welcome')}}</h1>
      <div class="input-group">
        <input class="form-control" v-model="form.username" :class="{'is-invalid':(errors.username.length>0)}" :disabled="working" :placeholder="$t('fields.username')" autofocus>
        <div class="invalid-feedback">
          {{errors.username}}
        </div>
      </div>
      <div class="input-group">
        <input type="password" v-model="form.password" class="form-control" :class="{'is-invalid':(errors.password.length>0)}" :disabled="working" :placeholder="$t('fields.password')">
        <div class="invalid-feedback">
          {{errors.password}}
        </div>
      </div>
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" v-model='form.remember'> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" :disabled="working" type="submit">{{$t('login.send')}}</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'login-page',
    data () {
      return {
        form: {
          username: '',
          password: '',
          remember: false
        },
        errors: {
          username: '',
          password: ''
        },
        dirty: {
          username: false,
          password: false
        }
      }
    },
    computed: {
      working () {
        return this.$store.state.auth.working
      }
    },
    methods: {
      submit() {
        const form = this.form
        for( var k in this.form ) {
          this.errors[k] = ''
          if (form[k].length < 3) {
            this.errors[k] = this.$i18n.t('errors.invalid_' + k)
          }
        }
        if( this.errors.username.length > 0 || this.errors.password.length > 0 ) {
          return false
        }
        this.$store.dispatch('authLogin', this.form)
      },
      setDirty(fieldName) {
        this.dirty[fieldName] = true
      },
      getValidationClass (fn) {
        if (this.form[fn]) {
          return {
            'is-invalid': this.dirty[fn] && this.errors[fn].length > 0
          }
        }
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
  .form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>

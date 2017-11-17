<template>
  <div class="expandHeight centerFlex">
    <form novalidate class="md-layout-row md-gutter centerFlex" @submit="submit">
      <md-card class="md-flex-50 md-flex-small-100">
        <md-card-header>
          <div class="md-title">{{$t('login.welcome')}}</div>
        </md-card-header>
        <md-card-content>
          <md-field :class="getValidationClass('username')">
            <label for="username">{{$t('fields.username')}}</label>
            <md-input name="username" id="username" v-model="form.username" :disabled="working" @change="setDirty('username')"/>
            <span class="md-error" :v-if="errors.username.length > 0">{{errors.username}}</span>
          </md-field>
          <md-field :class="getValidationClass('password')">
            <label for="password">{{$t('fields.password')}}</label>
            <md-input type="password" v-model="form.password" :disabled="working" @change="setDirty('password')"/>
            <span class="md-error" :v-if="errors.password.length > 0">{{errors.password}}</span>
          </md-field>
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
    name: 'login-page',
    data () {
      return {
        form: {
          username: '',
          password: ''
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
            'md-invalid': this.dirty[fn] && this.errors[fn].length > 0
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
</style>

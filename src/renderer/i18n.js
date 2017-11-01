import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import caLocale from 'element-ui/lib/locale/lang/ca'

const messages = {
  en: {
    errors: {
      'already_exists': 'Already exists'
    },
    register: {
      welcome: 'Welcome to key.cat. Please register',
      done: 'Congratulations! You have properly registered',
      username: 'Username',
      fullname: 'Full name',
      email: 'Email',
      password: 'Password',
      repeatPassword: 'Your password again',
      send: 'Register',
      error: {
        username: 'Username invalid. Probably too short',
        fullname: 'Full name missing',
        email: 'Email invalid',
        password: 'Password too short',
        password2: 'Passwords don\'t match',
        duplicate: 'Alredy taken'
      }
    },
    confirm_email: {
      title: 'Confirm your email',
      token: 'Confirmation token'
    },
    login: {
      welcome: 'Please login',
      username: 'Username',
      password: 'Password',
      send: 'Login',
      error: {
        you_cannot_do_that: 'Either the username is invalid or the password is'
      }
    },
    send: 'Send',
    ...enLocale
  },
  ca: {
    message: {
      welcome: 'Benvingut',
      ...caLocale
    }
  }
}

Vue.use(VueI18n)
export default new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages // set locale messages
})

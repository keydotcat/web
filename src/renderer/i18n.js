import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import caLocale from 'element-ui/lib/locale/lang/ca'

const messages = {
  en: {
    errors: {
      'already_exists': 'Already exists',
      'network': 'It seems the server is offline. Try again later',
      'bad_request': 'Seems the request is not properly formed.',
      'unknown': 'Wow. Something went wrong :P',
      'invalid_signature': 'Could not properly sign request',
      'invalid_email': 'Invalid email'
    },
    fields: {
      username: 'Username',
      fullname: 'Full name',
      email: 'Email',
      password: 'Password',
      repeatPassword: 'Your password again'
    },
    register: {
      welcome: 'Welcome to key.cat. Please register',
      done: 'Congratulations! You have properly registered',
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
      token: 'Confirmation token',
      done: 'You have confirmed your email'
    },
    login: {
      welcome: 'Please login',
      send: 'Login',
      error: {
        you_cannot_do_that: 'Either the username is invalid or the password is'
      }
    },
    send: 'Send',
    team: 'Team',
    logout: 'Log out',
    create_new_team: 'Create new team',
    configure: 'Configure',
    select_team: 'Change team',
    users: 'Users',
    vaults: 'Vaults',
    check_invite: 'Check invite',
    check_invite_contents: 'Please verify that the spelling is correct for',
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

import i18n from '@/i18n'

class RootSvc {
  constructor () {
    this.http = null
    this.urlRoot = ''
  }
  setHTTP (http) {
    this.http = http
  }
  setUrlRoot (ur) {
    this.urlRoot = ur
  }
  getHeaders() {
    return {
      headers: { 'X-Locale': i18n.locale }
    }
  }
}

export default new RootSvc()

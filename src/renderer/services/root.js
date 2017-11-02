import i18n from '@/i18n'

class RootSvc {
  constructor () {
    this.http = null
    this.urlRoot = ''
    this.sessionToken = ''
    this.csrf = ''
  }
  setHTTP (http) {
    this.http = http
  }
  setUrlRoot (ur) {
    this.urlRoot = ur
  }
  setToken (tok) {
    this.sessionToken = tok
  }
  getHeaders() {
    var headers = { 'X-Locale': i18n.locale }
    if (this.sessionToken) {
      headers['Authorization'] = `Bearer ${this.sessionToken}`
    }
    if (this.csrf) {
      headers['X-Csrf-Token'] = this.csrf
    }
    return { headers: headers }
  }
  processError(httpError, prefix ){
    if( !httpError.response ) {
      return 'errors.network'
    }
    var data = httpError.response.data
    if( data === null ) {
      switch( httpError.code ) {
        case '401':
          return 'errors.unauthorized'
        case '400':
          return 'errors.bad_request'
        case '500':
          return 'errors.server'
      }
      return 'errors.unknown'
    }
    // switch(errResponse.status == 
    return (prefix || '') + data.error.toLowerCase().replace(new RegExp(' ', 'g'), '_')
  }
}
export default new RootSvc()

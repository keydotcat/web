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
}

export default new RootSvc()

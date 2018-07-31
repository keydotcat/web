import Credential from '@/classes/credential'

export class SecretData {
  constructor() {
    this.data = {
      type: '',
      name: '',
      urls: [],
      creds: [],
      note: '',
      labels: []
    }
  }
  set type(v){
    this.data.type = v
  }
  get type(){
    return this.data.type
  }
  set name(v){
    this.data.name = v
  }
  get name(){
    return this.data.name
  }
  set note(v){
    this.data.note = v
  }
  get note(){
    return this.data.note
  }
  get urls() {
    return this.data.urls
  }
  get creds() {
    return this.data.creds
  }
  fromJson(obj) {
    this.data.type = obj.type || 'location'
    this.data.name = obj.name || []
    this.data.urls = obj.urls || []
    this.data.labels = obj.labels || []
    this.data.note = obj.note || ''
    this.data.creds = []
    obj.creds.forEach( cred => {
      var c = new Credential()
      c.type = cred.type || 'login'
      c.username = cred.username
      c.password = cred.password
      this.data.creds.push(c)
    })
  }
}

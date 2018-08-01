import Credential from '@/classes/credential'
import $ from 'jquery'

export default class SecretData {
  constructor() {
    this._data = {
      type: '',
      name: '',
      urls: [],
      creds: [],
      note: '',
      labels: []
    }
  }
  set type(v){
    this._data.type = v
  }
  get type(){
    return this._data.type
  }
  set name(v){
    this._data.name = v
  }
  get name(){
    return this._data.name
  }
  set note(v){
    this._data.note = v
  }
  get note(){
    return this._data.note
  }
  get urls() {
    return this._data.urls
  }
  get creds() {
    return this._data.creds
  }
  fromJson(obj) {
    this._data.type = obj.type || 'location'
    this._data.name = obj.name || []
    this._data.urls = obj.urls || []
    this._data.labels = obj.labels || []
    this._data.note = obj.note || ''
    this._data.creds = []
    var sourceCreds = obj.creds || []
    sourceCreds.forEach( cred => {
      var c = new Credential()
      c.type = cred.type || 'login'
      c.username = cred.username
      c.password = cred.password
      this._data.creds.push(c)
    })
  }
  cloneAsObject() {
    var c = $.extend(true, {}, this._data)
    for(var i = 0; i < this._data.creds.length; i++){
      c.creds[i] = this._data.creds[i].cloneAsObject()
    }
    return c
  }
}

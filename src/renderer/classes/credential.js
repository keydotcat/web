import XoredData from '@/classes/xored_data'

export default class Credential {
  constructor() {
    this._type = ''
    this._username = ''
    this._password = new XoredData('')
  }
  set type(v){
    this._type = v
  }
  get type(){
    return this._type
  }
  set username(v){
    this._username = v
  }
  get username(){
    return this._username
  }
  set password(v) {
    this._password = new XoredData(v)
  }
  get password() {
    return this._password.toString()
  }
  cloneAsObject() {
    return {
      type: this._type,
      username: this._username,
      password: this._password.toString()
    }
  }
}

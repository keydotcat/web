import XoredData from '@/classes/xored_data'

export class Credential {
  constructor() {
    this.type = ''
    this.username = ''
    this.password = XoredData('')
  }
  set type(v){
    this.data.type = v
  }
  get type(){
    return this.data.type
  }
  set username(v){
    this.username = v
  }
  get username(){
    return this.username
  }
  set password(v) {
    this.password = XoredData(v)
  }
  get password() {
    return this.password.toString()
  }
}

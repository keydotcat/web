export default class NoteData {
  constructor(obj) {
    this._data = {
      type: 'note',
      data: ''
    }
    if(obj){
      this.fromJson(obj)
    }
  }
  get type(){
    return this._data.type
  }
  set data(v){
    this._data.name = v
  }
  get data(){
    return this._data.name
  }
  fromJson(obj) {
    if(typeof obj === 'string'){
      obj = JSON.parse(obj)
    }
    if(obj.type !== 'location'){
      throw new Error('Invalid object type ' + obj.type)
    }
    this._data.data = obj.data || ''
  }
  cloneAsObject() {
    return {
      type: 'note',
      data: this._data.data
    }
  }
}

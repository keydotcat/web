import $ from 'jquery'

export default class NoteData {
  constructor(obj) {
    this._data = {
      type: 'note',
      name: '',
      data: '',
      labels: []
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
    this._data.name = obj.name || ''
    this._data.data = obj.data || ''
    this._data.labels = obj.labels || []
  }
  cloneAsObject() {
    return $.extend(true, {}, this._data)
  }
}

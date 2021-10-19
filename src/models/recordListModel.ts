const localStorageKeyName = 'recordList'
const recordListModel = {
  data:[] as RecordItem[],
  clone(data:RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(data))
  },
  fetch(){
    this.data= JSON.parse(window.localStorage.getItem('localStorageKeyName') || '[]') as RecordItem[];
    return this.data;
    //返回值也需要指定类型，可强制指定
  },
  save() {
    window.localStorage.setItem('localStorageKeyName',JSON.stringify(this.data))
  }
}
export {recordListModel}

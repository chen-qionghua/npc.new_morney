const localStorageKeyName = 'recordList'
const recordListModel = {
  clone(data:RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(data))
  },
  fetch(){
    return JSON.parse(window.localStorage.getItem('localStorageKeyName') || '[]') as RecordItem[];
    //返回值也需要指定类型，可强制指定
  },
  save(date:RecordItem[]) {
    window.localStorage.setItem('localStorageKeyName',JSON.stringify(date))
  }
}
export {recordListModel}

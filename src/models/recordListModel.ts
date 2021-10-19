// eslint-disable-next-line @typescript-eslint/no-unused-vars
import clone from '@/lib/clone'

const localStorageKeyName = 'recordList'
const recordListModel = {
  data:[] as RecordItem[],
  fetch(){
    this.data= JSON.parse(window.localStorage.getItem('localStorageKeyName') || '[]') as RecordItem[];
    return this.data;
    //返回值也需要指定类型，可强制指定
  },
  create() {
    const record2 = clone(this.data)
    record2.createAt =new Date()
    this.data.push(record2)},
  save() {
    window.localStorage.setItem('localStorageKeyName',JSON.stringify(this.data))
  }
}
export {recordListModel}

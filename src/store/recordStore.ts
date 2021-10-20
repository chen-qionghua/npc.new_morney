import clone from '@/lib/clone'
const localStorageKeyName = 'recordList'

const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords(){
    this.recordList= JSON.parse(window.localStorage.getItem('localStorageKeyName') || '[]') as RecordItem[];
    return this.recordList;
    //返回值也需要指定类型，可强制指定
  },
 saveRecords(){
   window.localStorage.setItem('localStorageKeyName',JSON.stringify(this.recordList))
 },
  createRecord(record:RecordItem) {
    const record2: RecordItem = clone(record)
    record2.createAt = new Date();
    this.recordList && this.recordList.push(record2);
    recordStore.saveRecords()
  },
}
recordStore.fetchRecords();
export default recordStore;
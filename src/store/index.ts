import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone'


Vue.use(Vuex);// 把 store 绑定到 Vue.prototype.$store = store

const store = new Vuex.Store({
  state: {
    recordList:[] as RecordItem[]
  },
  mutations: {
    fetchRecords(state){
      state.recordList= JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
      //返回值也需要指定类型，可强制指定
    },
    createRecord(state,record) {
      const record2: RecordItem = clone(record)
      record2.createAt = new Date();
      state.recordList.push(record2);
      console.log(state.recordList);
      store.commit('saveRecords')
      // recordStore.saveRecords()
    },
    saveRecords(state){
      window.localStorage.setItem('recordList',
        JSON.stringify(state.recordList))
    },
  },
  actions: {
  },
  modules: {
  }
})
export default store
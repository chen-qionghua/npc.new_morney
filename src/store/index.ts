import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone'
import createId from '@/lib/createId'
import router from '@/router'


Vue.use(Vuex);// 把 store 绑定到 Vue.prototype.$store = store

//注意：类型声明后需要导出才可用
export type RootState= {
  recordList:RecordItem[],
  tagList:Tag[]
  currentTag?:Tag
}
const store = new Vuex.Store({
  state: {
    recordList:[],
    tagList:[],
    currentTag:undefined
  } as RootState,
  mutations: {
    setCurrentTag(state,id:string) {
      store.commit('fetchTags')
      state.currentTag=state.tagList.filter(t => t.id ===id)[0]
    },
    updateTag(state,payload) {
      const {id,name} = payload;
      const idList = state.tagList.map(item =>item.id);
      if(idList.indexOf(id)>=0){
        const names = state.tagList.map(item => item.name)
        if(names.indexOf(name)>=0) {
          window.alert('标签名重复了')
        }else {
          const tag = state.tagList.filter(tag => tag.id === id)[0]
          tag.name = name;
          store.commit('saveTags')
        }
      }
    },
    removeTag (state,id:string)  {
      let index = -1
      for(let i = 0;i < state.tagList.length;i++){
        if(state.tagList[i].id === id) {
          index =i;
          break;
        }
      }
      if(index >= 0) {
        state.tagList.splice(index,1);
        store.commit('saveTags')
        router.back()
      }else {
        window.alert('删除失败')
      }
    },
    fetchRecords(state){
      state.recordList= JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
      //返回值也需要指定类型，可强制指定
    },
    createRecord(state,record) {
      const record2: RecordItem = clone(record)
      record2.createdAt = new Date().toISOString();
      state.recordList.push(record2);
      console.log(state.recordList);
      store.commit('saveRecords')
      // recordStore.saveRecords()
    },
    saveRecords(state){
      window.localStorage.setItem('recordList',
        JSON.stringify(state.recordList))
    },
    fetchTags(state) {
      state.tagList=JSON.parse(window.localStorage.getItem('tagList') || '[]') ;
    },
    createTag(state,name:string)  {
      //创建标签名的前提是拿到data，即用户输入的标签名，从fetch获取
      //此时data为数组对象，如this.data = [{id:1,name:2},{id:2,name:2}]，
      //需要拿到其对象中的属性name的值，使用 map 方法收集names
      const names = state.tagList.map(item => item.name);
      if(names.indexOf(name)>=0) {
        window.alert('标签名重复')
      }else {
        const id = createId().toString();
        state.tagList.push({id: id, name: name});
        store.commit('saveTags');   //注意保存
        window.alert('添加成功')
        //习惯将创建的东西 return回去
      }
    },
    saveTags(state){
      window.localStorage.setItem('tagList',JSON.stringify(state.tagList))
    },
  },
  actions: {
  },
  modules: {
  }
})
export default store
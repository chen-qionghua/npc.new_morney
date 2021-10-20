import recordStore from '@/store/recordStore'
import tagStore from '@/store/tagStore'

const store = {

  //问题：1.全局变量太多  2.严重依赖window
// record store
// tag store
//store模块化
  ...recordStore,
  ...tagStore

}
export default store;
import {recordListModel} from '@/models/recordListModel'
import {tagListModel} from '@/models/tagListModel'

const store = {
  //问题：1.全局变量太多  2.严重依赖window
// record store
  recordList: recordListModel.fetch(),
  createRecord:(record:RecordItem) =>{ recordListModel.create(record)},

// tag store
//封装tagList数组的增删改查
  tagList : tagListModel.fetch(),
//查
  findTag(id:string) {
    return this.tagList.filter(t => t.id === id)[0] //filter方法返回值为数组，必须后加[0]
  },
//增
  createTag:(name:string) => {
    const message = tagListModel.create(name);
    if(message ==='duplicated') {
      window.alert('标签名重复')
    }else if(message ==='success') {
      window.alert('添加成功')
    }
  },
//删
  remove :(id:string) => {
    return tagListModel.remove(id)
  },
//改
  updateTag:(id:string,name:string) => {
    return tagListModel.update(id,name)
  },
}
export default store;
import createId from '@/lib/createId'

const tagStore= {
  //封装tagList数组的增删改查
  tagList :[] as Tag[],  //对象在定义的时候无法调用和初始化，故此处先定义，在声明完对象后再初始化渲染
  fetchTags() {
    this.tagList=JSON.parse(window.localStorage.getItem('localStorageKeyName') || '[]') ;
    return this.tagList
  },
//查
  findTag(id:string) {
    return this.tagList.filter(t => t.id === id)[0] //filter方法返回值为数组，必须后加[0]
  },
//增
  createTag(name:string)  {
    //创建标签名的前提是拿到data，即用户输入的标签名，从fetch获取
    //此时data为数组对象，如this.data = [{id:1,name:2},{id:2,name:2}]，
    //需要拿到其对象中的属性name的值，使用 map 方法收集names
    const names = this.tagList.map(item => item.name);
    if(names.indexOf(name)>=0) {
      window.alert('标签名重复')
      return 'duplicated'
    }
    const id =createId().toString();
    this.tagList.push({id:id,name:name});
    this.saveTags();   //注意保存
    window.alert('添加成功')
    return 'success';
    //习惯将创建的东西 return回去

  },
//删
  removeTag (id:string)  {
    let index = -1
    for(let i = 0;i < this.tagList.length;i++){
      if(this.tagList[i].id === id) {
        index =i;
      }
    }
    this.tagList.splice(index,1);
    this.saveTags()
    return true;
  },
//改
  updateTag(id:string,name:string) {
    const idList = this.tagList.map(item =>item.id);
    if(idList.indexOf(id)>=0){
      const names = this.tagList.map(item => item.name)
      if(names.indexOf(name)>=0) {
        return 'duplicated'
      }else {
        const tag = this.tagList.filter(tag => tag.id === id)[0]
        tag.name = name;
        tag.id = name
        this.saveTags()
        return 'success'
      }
    }
    else{
      return 'not found'
    }
  },
  saveTags(){
    window.localStorage.setItem('localStorageKeyName',JSON.stringify(this.tagList))
  }
}
tagStore.fetchTags();  //init
export default tagStore;
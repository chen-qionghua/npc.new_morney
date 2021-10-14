const localStorageKeyName = 'tagList'
type tags = {
  id:string;
  name:string
}
type TagListModel = {
  data:tags[],
  fetch:() => tags[],
  create:(name:string) => 'success' | 'duplicated', //联合类型，字符串的子类型,方便后续类型检查（表单校验）
  save:() => void
}
const tagListModel:TagListModel = {
  data:[],
  fetch(){
    this.data=JSON.parse(window.localStorage.getItem('localStorageKeyName') || '[]') ;
    return this.data
    //返回值也需要指定类型，可强制指定
  },
  create(name){
    //创建标签名的前提是拿到data，即用户输入的标签名，从fetch获取
    //此时data为数组对象，如this.data = [{id:1,name:2},{id:2,name:2}]，
    //需要拿到其对象中的属性name的值，使用 map 方法收集names
    const names = this.data.map(item => item.name);
    if(names.indexOf(name)>=0) {
      return 'duplicated'
    }
    this.data.push({id:name,name:name});
    this.save();   //注意保存
    return 'success';
      //习惯将创建的东西 return回去
  },
  save() {
    window.localStorage.setItem('localStorageKeyName',JSON.stringify(this.data))
    //自己维护 data ，将data完全抽离出来
  }
}
export {tagListModel}

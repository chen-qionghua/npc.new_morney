const localStorageKeyName = 'tagList'
type TagListModel = {
  data:string[],
  fetch:() => string[],
  create:(name:string) => 'success' | 'duplicated', //联合类型，字符串的子类型
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
    if(this.data.indexOf(name)>=0) {
      return 'duplicated'
    }
    this.data.push(name);
    this.save();
    return name  //习惯将创建的东西 return回去
  },
  save() {
    window.localStorage.setItem('localStorageKeyName',JSON.stringify(this.data))
    //自己维护 data ，将data完全抽离出来
  }
}
export {tagListModel}

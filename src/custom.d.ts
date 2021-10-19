type RecordItem = { //ts声明类型（复杂类型、多个类型）
  tags:string[];
  notes:string;
  type:string;
  amount:number;
  createAt?:Date;
}
type tags = {
  id:string;
  name:string
}
type TagListModel = {
  data:tags[],
  fetch:() => tags[],
  create:(name:string) => 'success' | 'duplicated', //联合类型，字符串的子类型,方便后续类型检查（表单校验）
  update:(id:string,name:string) =>'success' | 'not found' |'duplicated'
  remove:(id:string) =>boolean
  save:() => void
}
interface window {
  tagList: Tag[];
  createTag:(name:string) => void
  remove:(id:string) => boolean
}

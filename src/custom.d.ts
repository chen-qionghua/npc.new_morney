//此文件下为全局声明
type RecordItem = { //ts声明类型（复杂类型、多个类型）
  tags:Tag[];
  notes:string;
  type:string;
  amount:number;
  createdAt?:string;
}
type Tag = {
  id:string;
  name:string
}
type TagListModel = {
  data:Tag[],
  fetch:() => Tag[],
  create:(name:string) => 'success' | 'duplicated', //联合类型，字符串的子类型,方便后续类型检查（表单校验）
  update:(id:string,name:string) =>'success' | 'not found' |'duplicated'
  remove:(id:string) =>boolean
  save:() => void
}
interface window {
  tagList: Tag[];
  createTag:(name:string) => void
  remove:(id:string) => boolean
  updateTag:(id:string,name:string) =>'success' | 'not found' |'duplicated'
  findTag:(id:string) => Tag
  recordList:RecordItem[]
  createRecord:(record:RecordItem[]) =>void

}
type RootState= {
  recordList:RecordItem[],
  createRecordError:null|Error,
  createTagError:null|Error,
  tagList:Tag[],
  currentTag?:Tag
}


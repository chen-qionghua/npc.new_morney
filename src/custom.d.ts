type RecordItem = { //ts声明类型（复杂类型、多个类型）
  tags:string[];
  notes:string;
  type:string;
  amount:number;
  createAt?:Date;
}
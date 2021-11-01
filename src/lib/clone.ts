function clone<T>(data:T):T {         //声明 T 类型（自定义），传入T类型则返回也是T类型 ；三者必须相同
  return JSON.parse(JSON.stringify(data))

}
export default clone;
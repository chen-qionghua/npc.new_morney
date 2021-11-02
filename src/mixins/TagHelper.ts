// mixins.js
import Vue from 'vue'
import Component from 'vue-class-component'

// You can declare mixins as the same style as components.
const map:{[key:string]:string} = {  //常用表驱动编程；对表内的key指定string类型 "[key:string]"，value指定string类型 ":string"
  'tag name duplicated':'标签名重复了'
}
@Component
export class TagHelper extends Vue {
  createTag() {
    const name = window.prompt('请输入标签名');
    if(!name) {  //空和！
      window.alert('标签名不能为空')
    }else{
      this.$store.commit('createTag',name)
    }
    if(this.$store.state.createTagError) {
      window.alert(map[this.$store.state.createTagError.message] || '未知错误') //常用；处理未知错误。如message为undefined
      }
    }
}
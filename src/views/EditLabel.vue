<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
        <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
    <FormItem
      :value="tag.name"
      @update:value="update"
      field-name="标签名"
      placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
    <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue'
import Button from '@/components/Button.vue'
@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {
  tag?: {id:string,name:string } = undefined;

  created() {
    //习惯将hash声明为id常量
    const id =this.$route.params.id
    //如何获取id（hash）所对应的tag
    const tag = window.findTag(id);
    if(tag) {
      this.tag = tag;
    }else {
      this.$router.replace('/404')//为防止用户404回退不了故用replace替代push
    }
  }
update(name:string) {
    if(this.tag){
      window.update(this.tag.id,name)
    }
}
remove() {
    if(this.tag) {
      window.remove(this.tag.id)
      this.$router.back()
    }
}
goBack() {
    this.$router.back()
}
}
</script>

<style lang="scss" scoped>
.navBar {
  font-size:16px;
  padding: 12px 16px;
  text-align: center;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .leftIcon {
    width: 22px;
    height: 22px;
  }
  > .title {}
  > .rightIcon {
    width: 22px;
    height: 22px;
  }
}
.form-wrapper {
  background: white;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;

}
</style>
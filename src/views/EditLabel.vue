<template>
  <Layout>
    <div>
      <Icon name="left"/>
        <span>编辑标签</span>
    </div>
    <Notes field-name="标签名"
            placeholder="请输入标签名"/>
  </Layout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {tagListModel} from '@/models/tagListModel'
import Notes from '@/components/Money/Notes.vue'
@Component({
  components: {Notes}
})
export default class EditLabel extends Vue {
  created() {
    //习惯将hash声明为id常量
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    //如何获取id（hash）所对应的tag
    const tag =tags.filter(t => t.id === id)[0] //filter方法返回值为数组，必须后加[0]
    if(tag) {
      console.log(tag)
    }else {
      this.$router.replace('/404')//为防止用户404回退不了故用replace替代push
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
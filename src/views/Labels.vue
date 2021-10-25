<template>
  <Layout>
    <div class="tags">
      <router-link class="tag"
                   v-for="tag in tagList" :key="tag.id"
                    :to = "`/labels/edit/${tag.id}`">
<!--        点击标签跳转到对应id，此处id为tag的id，恰好照应hash的id-->

        <span>{{tag.name}}</span>
        <Icon name="right"></Icon>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
    </div>
  </Layout>

</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator';
import Button from '@/components/Button.vue'
import {mixins} from 'vue-class-component'
import {TagHelper} from '@/mixins/TagHelper'

@Component({
  components: {Button},
  computed:{
    tagList() {
      return this.$store.state.tagList
    }
  },
})
export default class Labels extends mixins(TagHelper) {
  beforeCreate() {
    this.$store.commit('fetchTags')
  }


}
</script>

<style scoped lang="scss">
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > .tag {
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content:space-between;
  border-bottom:1px solid #e6e6e6;
  svg {
    width: 19px;
    height: 19px;
    color: #666;
    margin-right: 16px;
  }
  }
}
.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding:0 16px;
  &-wrapper {
    text-align: center;
    padding:16px;
    margin-top: 44-16px;
  }
}
</style>
<template>
<ul class="tabs">
  <li v-for="item in dataSource" :key="item.value"
      :class="liClass(item)" class="tabs-item"
      @click="select(item)">{{item.text}}</li>
</ul>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

type DataSourceItem = {text:string,value:string}

@Component
export default class Tabs extends Vue {
  @Prop(String) readonly value!:string;//子组件不预先定义type，由money父组件（方便统一维护）或者用户定义（符合逻辑）
  @Prop(String) classPrefix?:string //classPrefix为类名的前缀
  @Prop({required:true,type:Array}) dataSource!:DataSourceItem[];

  liClass(item:DataSourceItem) {
    return {[this.classPrefix + '-tabs-item']: this.classPrefix,
      selected: item.value === this.value}
  }
  select(item:DataSourceItem) {
    this.$emit('update:value',item.value)
  }

}
</script>

<style lang="scss" scoped>
.tabs {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  &-item {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>
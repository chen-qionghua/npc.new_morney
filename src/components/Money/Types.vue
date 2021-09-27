<template>
  <div>
    <ul class="types">
      <li :class="type ==='-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type ==='+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

@Component
export default class Types extends Vue {
  @Prop() readonly value!:string ;//子组件不预先定义type，由money父组件（方便统一维护）或者用户定义（符合逻辑）
  //！表示不赋予初始值
  selectType(type:string) {
  if(type !=='-' &&type!=='+') {
    throw new Error('type is unknown')
  }else {
    this.$emit('update:value',type)
  }
  }
}
</script>

<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  > li {
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
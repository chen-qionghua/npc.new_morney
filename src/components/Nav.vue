<template>
 <div class="nav">
   <router-link to="/money" class="item" active-class="selected">
     <Icon name="money"></Icon>
     记账</router-link>|
   <router-link to="/labels" class="item" active-class="selected">
     <Icon name="label"></Icon>
     标签</router-link>|
   <router-link to="/statistics" class="item" active-class="selected">
     <Icon name="statistic"></Icon>
     统计</router-link>
 </div>
</template>

<script lang="ts">
export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/helper.scss";
nav {
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  > .item {
    border: 1px solid red;
    padding: 2px 0;
    width: 33.3333%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .icon {
      width: 32px;
      height: 32px;
    }
  }
  > .item.selected {
    color: $color-highlight;
  }
}
</style>
<template>
 <div class="nav">


   <router-link to="/money">
     <Icon name="money"></Icon>
     记账</router-link>|
   <router-link to="/labels">
     <Icon name="label"></Icon>
     标签</router-link>|
   <router-link to="/statistics">
     <Icon name="statistic"></Icon>
     统计</router-link>
 </div>
</template>

<script>
import x from '@/assets/icons/label.svg'
import y from '@/assets/icons/money.svg'
import z from '@/assets/icons/statistic.svg'


import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Nav extends Vue {

}
</script>

<style lang="scss" scoped>
.nav {
  border: 1px solid red;
}
</style>
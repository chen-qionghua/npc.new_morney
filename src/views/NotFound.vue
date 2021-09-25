<template>
<div>
  <div>当前页面不存在，请检查网址是否正确</div>
  <div><router-link to="/">返回首页</router-link></div>
</div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class NotFound extends Vue {

}
</script>

<style scoped>

</style>
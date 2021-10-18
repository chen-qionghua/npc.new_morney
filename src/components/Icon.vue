<template>
  <svg class="icon" @click="$emit('click',$event)">
    <use v-bind:xlink:href="'#'+name"></use>
  </svg>
</template>

<script lang="ts">
//将一个目录内任意后缀的文件统一全部引入当前文件
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {importAll(require.context('../assets/icons', true, /\.svg$/));} catch (error) {console.log(error);}
export default {
  props: ['name'],
  name: 'Icon'
};
// import {Component, Vue} from 'vue-property-decorator';
//
// @Component
// export default class Icon extends Vue {
//
//   props: ['name'];
//   name: 'Icon'
//
// }
</script>

<style lang="scss" scoped>
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
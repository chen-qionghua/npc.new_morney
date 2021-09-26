<template>
  <div class="layout-wrapper" :class="classPrefix && `${clearPrefix}-wrapper`">
    <div class="content" :class="classPrefix && `${classPrefix}-content`" >
     <slot/>
    </div>
    <Nav/>
  </div>

</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Layout extends Vue {

}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  overflow: auto;
  flex-grow: 1;
}
</style>
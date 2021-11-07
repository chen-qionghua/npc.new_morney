<template>
  <div class="wrapper" ref="wrapper">

  </div>
</template>

<script lang="ts">
import {Component, Prop,Vue} from 'vue-property-decorator';
import * as echarts from 'echarts'
import EChartOption from 'echarts'
@Component
export default class Chart extends Vue {
@Prop() option:EChartOption;

mounted() {
  console.log(echarts)

  if(this.option === undefined) {
    return console.error('option为空')
  }else {

    const chart =  echarts.init(this.$refs.wrapper as HTMLDivElement)
    chart.setOption(this.option)
  }
}
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 400px;
}
</style>
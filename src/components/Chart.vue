<template>
  <div class="wrapper" ref="wrapper">

  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import * as echarts from 'echarts'
import EChartOption from 'echarts'

@Component
export default class Chart extends Vue {
@Prop() option:EChartOption;
chart:echarts

mounted() {
  if(this.option === undefined) {
    return console.error('option为空')
  }else {
    this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement)
    this.chart.setOption(this.option)
  }
}
@Watch('option')
  onOptionChange(newValue:EChartOption) {
  this.chart.setOption(newValue)
}
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 400px;
}
</style>
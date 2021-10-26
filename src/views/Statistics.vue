<template>
  <Layout>
    <Tabs
      class-prefix="type"
      :data-source="recordTypeList" :value.sync="type"/>
    <Tabs
      class-prefix="interval"
      :data-source="intervalList" :value.sync="interval"/>
    <div>
      type:{{type}}
      <br/>
      interval:{{interval}}
    </div>
  </Layout>

</template>

<style scoped lang="scss">
::v-deep .type-tabs-item {
  background: white;
  &.selected{
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}

</style>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Types from '@/components/Money/Types.vue'
import Tabs from '@/components/Tabs.vue'
import intervalList from '@/constants/intervalList'
import recordTypeList from '@/constants/recordTypeList'

@Component({
  components:{Types,Tabs}
})
export default class Statistics extends Vue {
  type='-'
  interval='day'
  intervalList=intervalList;
  recordTypeList=recordTypeList;
}
</script>


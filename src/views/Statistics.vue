<template>
  <Layout>
    <Tabs
      class-prefix="type"
      :data-source="recordTypeList" :value.sync="type"/>
    <div class="chart-wrapper" ref="chartWrapper">
<Chart :option="x" class="chart"/>
    </div>
      <ol v-if="groupedList.length>0">
        <li v-for="(group,index) in groupedList" :key="index">
          <h3 class="title">{{beautify(group.title)}}<span>￥{{group.total}}</span></h3>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="record">
              <span>{{tagString(item.tags)}}</span><span class="notes">{{item.notes}}</span><span>￥{{item.amount}}</span>
            </li>
          </ol>
        </li>
      </ol>
<div v-else class="noResult">
  目前没有相关记录
</div>
  </Layout>

</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue'
import recordTypeList from '@/constants/recordTypeList'
import dayjs from 'dayjs'
import clone from '@/lib/clone'
import Chart from '@/components/Chart.vue'
import _ from 'lodash'
import day from 'dayjs'
@Component({
  components:{Tabs,Chart}
})
export default class Statistics extends Vue {
  mounted() {
    const div = this.$refs.chartWrapper
    div.scrollLeft = div.scrollWidth

  }
  beautify(string:string) {
    const day =dayjs(string)
    const now = dayjs()
    if(day.isSame(now,'day')) {
      return '今天'
    }else if(day.isSame(now.subtract(1,'day'),'day')) {
      return '昨天'
    }else if(day.isSame(now.subtract(2,'day'))) {
      return '前天'
    }else if (day.isSame(now,'year')){
      return day.format('M月D日')
    }else {
      return day.format('YYYY年M月D日')
    }
  }
  tagString(tags:Tag[]) {
    return tags.length === 0 ? '无' : tags.map(t => t.name).join('，')
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get x() {
    const today = new Date();
    const array = [];
    for(let i = 0;i<=29;i++) {
      //this.recordList = [{date:7.3,value:100},{date:7.2,value:200}]
      const dateString =day(today).subtract(i,'day').format('YYYY-MM-DD')
      array.push({
        date:dateString,
        value:_.find(this.recordList,{createdAt:dateString})?.amount
      })
    }
    console.log(array)
    console.log(this.recordList.map(r => _.pick(r, ['createdAt','amount'])))
    return {
      xAxis: {
        type: 'category',
        data: [
          '1', '2', '3', '4', '5', '6', '7','8','9','10',
          '11', '12', '13', '14', '15', '16', '17','18','19','20',
          '21', '22', '23', '24', '25', '26', '27','28','29','30',
        ],
        axisTick:{alignWithLabel:true},
        axisLine:{lineStyle:{color:'#666'}}
      },
      tooltip:{
        show:true,
        triggerOn:'click',
        position:'top',
        formatter:'{c}'
      },
      grid: {
        left:10,
        right:10
      },
      yAxis: {
        type: 'value',
        show:false
      },
      series: [
        {
          symbolSize:15,
          symbol:'circle',
          itemStyle:{borderWidth:1,color:'#666',borderColor:'#666'},
          data: [
            150, 230, 224, 218, 135, 147, 260,
            150, 230, 224, 218, 135, 147, 260,
            150, 230, 224, 218, 135, 147, 260,
            150, 230, 224, 218, 135, 147, 260,1,2
          ],
          type: 'line'

        }
      ]
    }
  }
  get groupedList() {
   //[
    //  {title,items}
    //  {title,items}
    //]
    const {recordList} = this

    const newList = clone(recordList)
      .filter(r => r.type === this.type)
      .sort((a,b) => dayjs(b.createdAt).valueOf()-dayjs(a.createdAt).valueOf())
    if(newList.length === 0) {return[]}
    type Result ={title:string,total?:number,items:RecordItem[]}[]
    const result:Result =[{title:dayjs(newList[0].createdAt).format('YYYY-MM-DD'),items:[newList[0]]}]
    for(let i = 1;i<newList.length;i++) {
      const current = newList[i];
      const last = result[result.length-1]
      if(dayjs(last.title).isSame(current.createdAt,'day')) {
        last.items.push(current)
      }else {
        result.push({title:dayjs(current.createdAt).format('YYYY-MM-DD'),items:[current]})
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum,item) => sum+item.amount,0)
    })
    return result
  }
  beforeCreate() {
    this.$store.commit('fetchRecords')
  }
  type='-'
  recordTypeList=recordTypeList;
}
</script>

<style scoped lang="scss">
.chart {
  width: 430%;
  height: 400px;
  &-wrapper {
    overflow: auto;
  }
}
.noResult{
  padding: 16px;
  text-align: center;
}
%item {
  padding:8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
::v-deep .type-tabs-item {
  background:  #c4c4c4;
  &.selected{
    background:white;
    &::after {
      display: none;
    }
  }
}
::v-deep .interval-tabs-item {
  height: 48px;
}

</style>


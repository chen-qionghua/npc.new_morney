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

  get y() {
    const today = new Date();
    const array = [];
    for(let i = 0;i<=29;i++) {
      //this.recordList = [{date:7.3,value:100},{date:7.2,value:200}]
      const dateString =day(today).subtract(i,'day').format('YYYY-MM-DD')
      const found =_.find(this.groupedList,{title:dateString})
      array.push({
        date:dateString,
        value: found ? found.total:0
        //从 this.recordList 数组中找 createdAt 为 dateString 的对象，返回对象或undefined
      })
    }
    array.sort((a,b) => {
      if(a.date > b.date) {
        return 1;
      }else if(a.date === b.date) {
        return 0
      }else {
        return -1
      }
    })
    return array
  }

  get x() {
    const keys = this.y.map(item => item.date)  //在array中查找每一项item，对每一项item获取其date，组成一个新数组
    const values = this.y.map(item => item.value)
    return {
      xAxis: {
        type: 'category',
        data: keys,
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
          data: values,
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


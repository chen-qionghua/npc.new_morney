<template>
<Layout class-prefix="layout">
  {{recordList}}
  <Tags :data-source.sync ='tags' @update:value ="onUpdateTags"/>
  <Notes @update:value ="onUpdateNotes"/>
  <Types :value.sync ="record.type" />
  <NumberPad @update:value ="onUpdateAmount" @submit="saveRecord"/>

</Layout>

</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Vue, Watch} from 'vue-property-decorator'
import {model} from '@/model'

const recordList = model.fetch();

@Component({  components: {Tags, Notes, Types, NumberPad},
})
export default class Money extends Vue{
      tags=['衣','食','住','行','拉粑粑'];
     recordList:RecordItem[] = recordList;
      //将四个模块收集来的数据整合到record数组对象中
      record:RecordItem = {  //ts调用时：声明类型且赋予初始值
        tags:[],
        notes:'',
        type:'-',
        amount:0
      };
      onUpdateTags(value:string[]) {
        this.record.tags =value//获取用户选择的标签
      }
      onUpdateNotes(value:string){
        this.record.notes = value//获取用户输入的notes

      }
      onUpdateAmount(value:string) {
        this.record.amount = parseFloat(value)
      }
      saveRecord() {
        const record2 = model.clone(this.record)
        record2.createAt =new Date()
        this.recordList.push(record2)
      }
      @Watch('recordList')
      onRecordListChange() {
        model.save(this.recordList)
      }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
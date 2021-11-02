<template>
<Layout class-prefix="layout">
  <Tags @update:value="record.tags=$event"/>
  <div class="notes">
  <FormItem field-name="备注"
         placeholder="请在这里输入备注"
            :value.sync="record.notes"/>
  </div>
  <Tabs :data-source="recordTypeList"
        :value.sync="record.type"/>
  <NumberPad @update:value ="onUpdateAmount" @submit="saveRecord"/>

</Layout>

</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Vue } from 'vue-property-decorator'
import recordTypeList from '@/constants/recordTypeList'
import Tabs from '@/components/Tabs.vue'

@Component({
  components: {Tags, FormItem, NumberPad,Tabs},
})
export default class Money extends Vue{
  get recordList() {
    return this.$store.state.recordList;
  }
  // eslint-disable-next-line no-undef
      //将四个模块收集来的数据整合到record数组对象中
  // eslint-disable-next-line no-undef
      record:RecordItem = {  //ts调用时：声明类型且赋予初始值
        tags:[],
        notes:'',
        type:'-',
        amount:0
      };
  recordTypeList=recordTypeList;
      created() {
       this.$store.commit('fetchRecords')
      }
      onUpdateNotes(value:string){
        this.record.notes = value//获取用户输入的notes

      }
      onUpdateAmount(value:string) {
        this.record.amount = parseFloat(value)
      }
      saveRecord() {
        if(!this.record.tags || this.record.tags.length===0) {
          return window.alert('请至少选择一个标签')
        }
        this.$store.commit('createRecord',this.record)
        if(this.$store.state.createRecordError ===null) {
          window.alert('已保存')
          this.record.notes=''
        }
      }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>
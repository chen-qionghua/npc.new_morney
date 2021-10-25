<template>
<Layout class-prefix="layout">
  <Tags />
  <div class="notes">
  <FormItem field-name="备注"
         placeholder="请在这里输入备注"
         @update:value ="onUpdateNotes"/>
  </div>
  <Types :value.sync ="record.type" />
  <NumberPad @update:value ="onUpdateAmount" @submit="saveRecord"/>

</Layout>

</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Vue } from 'vue-property-decorator'

@Component({
  components: {Tags, FormItem, Types, NumberPad},
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
        this.$store.commit('createRecord',this.record)
      }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>
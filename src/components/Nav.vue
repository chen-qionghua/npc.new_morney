<template>
 <div>


   <router-link to="/money">money</router-link>|
   <router-link to="/labels">labels</router-link>|
   <router-link to="/statistics">statistics</router-link>
 </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Nav extends Vue {

}
</script>

<style scoped>

</style>
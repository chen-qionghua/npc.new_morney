<template>
  <div id="app">
    <router-view/>
    <hr>
  </div>
</template>

<style lang="scss">
@import "src/assets/style/helper.scss";
@import "src/assets/style/reset.scss";
body{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-family: $font-hei;
  font-size: 16px;
  line-height: 1.5;
  background: #f5f5f5;
}
#app {
  max-width:500px;
  margin:auto;
}
</style>

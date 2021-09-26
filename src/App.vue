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
}
</style>

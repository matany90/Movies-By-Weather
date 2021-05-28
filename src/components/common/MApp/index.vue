<template>
  <div class="m-app">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@import "../../../style/_main.scss";

* {
  margin: 0;
  padding: 0;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  background: map-deep-get($matan-colors, "black", "dark");
}

.m-app {
  font-family: $root-font-family;
  font-size: $root-font-size;
  color: $root-font-color;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: $root-line-height;
  height: 100%;
  width: 100%;
}
</style>


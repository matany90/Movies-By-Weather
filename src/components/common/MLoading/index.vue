<template>
  <div :class="loadingClasses"></div>
</template>

<script>
export default {
  // props
  props: {
    size: {
      type: String,
      default: "small"
    }
  },

  // computed properties
  computed: {
    loadingClasses() {
      return {
        "m-loading": true,
        [`m-loading-${this.size}`]: true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.m-loading {
  display: inline-block;
  width: 100%;
  height: 100%;
  content: " ";
  display: block;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 50%;
  border: 3px solid #d3d3d3;
  border-color: #d3d3d3 transparent #d3d3d3 transparent;
  animation: m-loading 1.2s linear infinite;
}

.m-loading-small {
  width: 22px;
  height: 22px;
}

.m-loading-large {
  width: 100px;
  height: 100px;
}

@keyframes m-loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

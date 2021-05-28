<template>
  <div>{{ movie }}</div>
</template>

<script>
export default {
  // props
  props: {
    movie: {
      type: Object,
      default: {}
    }
  }
}
</script>

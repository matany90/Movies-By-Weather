<template>
  <div>
    <div>Foo</div>
  </div>
</template>

<script>
import omdbAPI from "../api/omdb"

export default {
  async mounted() {
    const res = await omdbAPI().search({ s: "family" })
    console.log("res::", res)
  }
}
</script>

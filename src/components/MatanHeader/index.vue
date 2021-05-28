<template>
  <!-- Header container -->
  <header class="text-gray-100 bg-m-bg body-font shadow w-full">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <!-- Header options -->
        <div class="flex flex-row">
          <div v-for="(header, i) in headerOptions" :key="i">

            <!-- Render Header label -->
            <div
              :class="headersClasses(header.id)"
              @click="header.cb"
            >
              {{ header.label }}
            </div>

          </div>
        </div>
      </div>
  </header>
</template>

<script>
export default {
  // set component name
  name: "MatanHeader",

  // define props
  props: {
    // selected header id
    selectedHeader: {
      type: String,
      default: ""
    },

    // headers options
    headerOptions: {
      type: Array,
      default: () => ([])
    }
  },

  // local methods
  methods: {
    /**
     * headersClasses returns the
     * header classes
     */
    headersClasses(headerId) {
      // define base header classes
      const baseHeaderClass = {
        "ml-10": true,
        "cursor-pointer": true
      }

      // bold on select
      if (headerId === this.selectedHeader) {
        baseHeaderClass["font-black"] = true
      }

      // return classes
      return baseHeaderClass
    }
  }
}
</script>

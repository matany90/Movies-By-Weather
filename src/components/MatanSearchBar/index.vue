<template>
  <div class="box pt-6">
      <div class="box-wrapper">
          <div class="bg-white rounded flex items-center w-full pl-3 pr-3 shadow-sm border border-gray-200">
            <!-- Search icon -->
            <button class="outline-none focus:outline-none" @click="$emit('on-search')">
              <svg class=" w-5 text-gray-600 h-5 cursor-pointer" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <!-- Input -->
            <input
              v-model="search.input"
              @change="resetPaging"
              class="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent text-black"
              type="search"
              placeholder="search for images"
            />

            <!-- Select all -->
            <select
              :value="search.select.value"
              @change="onSelectChange"
              class="text-gray-600 text-lg p-3"
            >
              <option v-for="(option, i) in search.select.options" :key="i" :value="option.value">
                {{ option.display }}
              </option>
            </select>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  // local props
  props: {
    // search input
    search: {
      type: Object,
      default: () => ({})
    }
  },

  // methods
  methods: {
    /**
     * set value for select
     */
    onSelectChange(e) {
      // set select value
      this.search.select.value = e.target.value

      // reset paging
      this.resetPaging()
    },

    /**
     * resetPaging reset pagination
     */
    resetPaging() {
      this.search.page = 1
    }
  }
}
</script>

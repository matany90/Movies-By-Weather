<template>
  <div>
    <!-- Random/Search movies -->
    <div class="matan-home-elements">
      <!-- Title -->
      <div class="matan-home-elements--title text-center text-4xl mt-10 ml-10 mr-10">
        {{ $t(`home.${this.moviesKey}.title`) }}
      </div>

      <!-- Info Container -->
      <div class="flex flex-row w-full justify-center">
        <!-- Prev page icon -->
        <div class="w-1/4 flex justify-center content-start items-end md:items-start">
          <m-icon
            v-if="isPrevIconVisible"
            name="left-arrow"
            type="button"
            class="ml-2"
            @click="$emit('on-prev-page')"
          />
        </div>
        <!-- Info text -->
        <div class="w-1/2">
          <div
            class="matan-home-elements--info mt-10 text-center w-full"
            v-html="$t(`home.${this.moviesKey}.info`)"
          />
        </div>

        <!-- Next page icon -->
        <div class="w-1/4 flex justify-center content-start items-end md:items-start">
          <m-icon
            v-if="isNextIconVisible"
            name="right-arrow"
            type="button"
            class="mr-2"
            @click="$emit('on-next-page')"
          />
        </div>
      </div>
    </div>

    <!-- set loader -->
    <div v-if="loading" class="flex justify-center mt-20" style="height: 600px">
    <m-loading size="large" />
    </div>
    <!-- render movies/tv shows -->
    <div v-else class="flex flex-wrap justify-center md:container md:mx-auto mt-10 md:mt-20">
      <div
        v-for="(omdbEl, i) in formattedOmdbElements"
        :key="i"
        class="md:p-5 p-0"
      >
        <matan-movie-card :movie="omdbEl" />
      </div>
    </div>
  </div>
</template>

<script>
import { OMDB_CONFIGS } from "../../configs"

export default {
  // props
  props: {
    // random movies
    randomMovies: {
      type: Array,
      default: () => ([])
    },

    // search movies
    searchMovies: {
      type: Array,
      default: () => ([])
    },

    // total search results
    totalSearchResults: {
      type: Number,
      default: () => 0
    },

    // current page
    currentPage: {
      type: Number,
      default: () => 1
    },

    // loading flag
    loading: {
      type: Boolean,
      default: false
    }
  },

  // computed proprties
  computed: {
    /**
     * Returns the movies key by search len
     */
    moviesKey() {
      return this.searchMovies.length ? "search" : "random"
    },

    /**
     * formattedOmdbElements return the relavnt array
     * by search len
     */
    formattedOmdbElements() {
      return this.searchMovies.length ? this.searchMovies : this.randomMovies
    },

    /**
     * isPrevIconVisible checks if prev
     * icon is visible
     */
    isPrevIconVisible() {
      return this.searchMovies.length && this.currentPage !== 1
    },

    /**
     * isNextIconVisible checks if next
     * page icon is visible
     */
    isNextIconVisible() {
      return (
        this.searchMovies.length &&
        this.currentPage * OMDB_CONFIGS.apiLimit <= this.totalSearchResults
      )
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/_main.scss";

.matan-home-elements {
  // Title section
  &--title {
    font-family: $title-font-family;
    font-weight: $title-font-weight
  }

  // Info section
  &--info {
    font-family: $title-font-family
  }
}
</style>
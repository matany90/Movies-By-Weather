<template>
  <div>
    <!-- Random/Search movies -->
    <div class="matan-home-elements">
      <!-- Title -->
      <div class="matan-home-elements--title text-center text-4xl mt-20 ml-10 mr-10">
        {{ $t(`home.${this.moviesKey}.title`) }}
      </div>

      <!-- Info Container -->
      <div class="flex flex-row w-full justify-center">
        <!-- Prev page icon -->
        <m-icon
        v-if="isPrevIconVisible"
        name="left-arrow"
        type="button"
        class="ml-2"
        @click="$emit('on-prev-page')"
      />
        <!-- Info text -->
        <div
          class="matan-home-elements--info mt-10 text-center ml-5 mr-5 md:ml-5 md:ml-5"
          v-html="$t(`home.${this.moviesKey}.info`)"
        />

        <!-- Next page icon -->
        <m-icon
        v-if="isNextIconVisible"
        name="right-arrow"
        type="button"
        class="mr-2"
        @click="$emit('on-next-page')"
      />
      </div>
    </div>

    <!-- render movies/tv shows -->
    <div class="flex flex-wrap justify-center md:container md:mx-auto">
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
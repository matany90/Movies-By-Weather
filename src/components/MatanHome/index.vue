<template>
  <div>
    <!-- Random/Search movies -->
    <div class="matan-home-elements">
      <!-- Title -->
      <div class="matan-home-elements--title text-center text-4xl mt-20">
        {{ $t(`home.${this.moviesKey}.title`) }}
      </div>

      <!-- Info -->
      <div
        class="matan-home-elements--info text-center mt-10"
        v-html="$t(`home.${this.moviesKey}.info`)"
      />
    </div>

    <!-- render movies/tv shows -->
    <div v-for="(omdbEl, i) in formattedOmdbElements" :key="i">
      <matan-movie-card :movie="omdbEl" />
    </div>
  </div>
</template>

<script>
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
<template>
  <!-- Card container -->
  <div class="matan-movie-card flex flex-col justify-center items-center my-8">

    <!-- Background image -->
    <div
      :style="imageStyle"
      class="bg-gray-300 w-full rounded-lg shadow-md bg-cover bg-center"
      style="height: 400px"
    />
    <div class="w-56 md:w-64 shadow-lg rounded-lg overflow-hidden">
      <!-- Title -->
      <div class="matan-movie-card--title py-2 text-center tracking-wide text-white h-24">
        {{ movie.Title }}
      </div>
    </div>
  </div>
</template>

<script>
import { NO_IMAGE_URL } from "../../configs"

export default {
  // props
  props: {
    movie: {
      type: Object,
      default: () => ({})
    }
  },

  // computed properties
  computed: {
    /**
     * Returns the image background style
     */
    imageStyle() {
      return {
        "background-image": `url(${this.imageUrl})`
      }
    },

    /**
     * Returns the image url
     */
    imageUrl() {
      return this.movie.Poster !== "N/A" ? this.movie.Poster : NO_IMAGE_URL
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/_main.scss";

.matan-movie-card {
  &--title {
    font-family: $card-title-font-family;
    $card-title-font-weight: $card-title-font-weight;
    $card-title-font-size: $card-title-font-size;
  }
}
</style>
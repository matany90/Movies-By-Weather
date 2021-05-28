<template>
  <!-- Card container -->
  <div class="matan-movie-card flex flex-col justify-center items-center my-8">

    <!-- Background image -->
    <div
      :style="imageStyle"
      class="bg-gray-300 w-full rounded-lg shadow-md bg-cover bg-center"
      style="height: 400px"
    />
    <div class="w-56 md:w-64 bg-white shadow-lg rounded-lg overflow-hidden">
      <!-- Title -->
      <div class="matan-movie-card--title py-2 text-center tracking-wide text-gray-800 h-20">
        {{ movie.Title }}
      </div>

      <!-- Card footer -->
      <div class="flex items-center justify-between py-2 px-3 bg-gray-400">
        <h1 class="text-gray-800 font-bold">
          {{ movie.Year }}
        </h1>
        <button class="bg-gray-800 text-xs text-white px-2 py-1 font-semibold rounded uppercase hover:bg-gray-700">
          {{ $t("home.card.moreInfo") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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
      console.log(this.movie)
      return this.movie.Poster !== "N/A" ? this.movie.Poster : "https://m.media-amazon.com/images/M/MV5BMDQ3NWE1NDgtZDBjMS00NmI3LWJiN2ItMTA4Njk0ZjU0NDg5XkEyXkFqcGdeQXVyMDAwMDAwMw@@._V1_SX300.jpg"
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
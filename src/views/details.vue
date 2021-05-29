<template>
  <!-- Details container -->
  <div class="matan-details md:container md:mx-auto flex md:flex-row flex-col mt-10">

    <!-- Image -->
    <div class="md:w-1/3 md:p-0 p-3">
      <div class="flex justify-center">
        <div class="flex flex-col">
          <img :src="imageUrl" class="rounded" />
          <star-rating
            v-if="movie.imdbRating !== 'N/A'"
            :max-rating="5"
            :rating="Number(movie.imdbRating / 2)"
            :show-rating="false"
            :read-only="true"
            class="flex justify-center mt-4"
          />
        </div>
      </div>
    </div>

    <!-- Details -->
    <div class="md:w-2/3 divide-y divide-red-900 md:p-0 p-5">
      <div class="mb-4">
        <!-- Title -->
        <div class="matan-details--title">{{ movie.Title }}</div>

        <!-- Release Date -->
        <div class="text-sm mt-2">{{ movieYear }}</div>
      </div>

      <!-- Additinal Info -->
      <div>
        <!-- Genre -->
        <div v-if="movie.Genre" class="mt-5">
          <span class="text-sm text-gray-600 font-extrabold">
            {{ $t("details.genre") }}
          </span>
          <span class="text-sm font-extrabold">{{ movie.Genre }}</span>
        </div>

        <!-- Rating -->
        <div v-if="movie.imdbRating" class="mt-5">
          <span class="text-sm text-gray-600 font-extrabold">
            {{ $t("details.rating") }}
          </span>
          <span class="text-sm font-extrabold">{{ movie.imdbRating }}</span>
        </div>

        <!-- Actors -->
        <div v-if="movie.Actors" class="mt-5 mb-5">
          <span class="text-sm text-gray-600 font-extrabold">
            {{ $t("details.actors") }}
          </span>
          <span class="text-sm font-extrabold">{{ movie.Actors }}</span>
        </div>
      </div>

      <!-- Description -->
      <div>
        <div class="mt-5 matan-details--plot">{{ movieDescription }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import initOmdbAPI from "../api/omdb"
import { NO_IMAGE_URL } from "../configs"

// define omdb api
const omdbClient = initOmdbAPI()

export default {
  components: {
    StarRating
  },
  // local state
  data() {
    return {
      // movie details
      movie: {}
    }
  },

  // mounted hook
  async mounted() {
    this.movie = await this.getMovieDetails()
  },

  // methods
  methods: {
    /**
     * getMovieDetails pulls movie info
     */
    async getMovieDetails() {
      // pull details by id
      const { data } = await omdbClient.get(this.$route.params.id)
      return data
    }
  },

  // computed properites
  computed: {
    /**
     * Returns the image url
     */
    imageUrl() {
      return this.movie.Poster !== "N/A" ? this.movie.Poster : NO_IMAGE_URL
    },

    /**
     * Returns movies year
     */
    movieYear() {
      return this.movie?.Released.replace("-", "")
    },

    /**
     * Returns movie description
     */
    movieDescription() {
      return this.movie.Plot !== "N/A" ? this.movie.Plot : this.$t("general.noDescription")
    }
  }
}
</script>

<style scoped lang="scss">
@import "../style/_main.scss";

.matan-details {
  &--title {
    font-family: $details-title-font-family;
    font-weight: $details-title-font-weight;
    font-size: $details-title-font-size;
  }

  &--plot {
    font-family: $details-plot-font-family;
    font-weight: $details-plot-font-weight;
    font-size: $details-plot-font-size;
  }
}
</style>
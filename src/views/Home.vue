<template>
  <div>
    <!-- Search bar - Mobile view only -->
    <div class="block md:hidden">

      <!-- image mobile container -->
      <div class="flex justify-center">
        <img src="@/assets/images/popcorn.svg" class="w-32 mb-6 mt-5" />
      </div>

      <!-- search bar mobile -->
      <matan-search-bar
        :search="search"
        @on-search="onSearchClick"
        class="md:ml-20 md:mr-20 ml-10 mr-10"
      />
    </div>

    <!-- Background logo -->
    <div class="background-logo md:block hidden">

      <!-- Background content -->
      <div class="background-logo-content flex flex-row">

        <div class="w-1/2" />

        <div class="w-1/2 text-center mt-40 p-5">
          <!-- Background title -->
          <div>{{ $t("home.title") }}</div>

          <!-- Background info -->
          <div class="background-logo--subtitle">
            {{ $t("home.subtitle") }}
          </div>

          <!-- Search bar -->
          <matan-search-bar
            :search="search"
            @on-search="onSearchClick"
            class="ml-20 mr-20"
          />
        </div>
      </div>
    </div>

    <!-- Render movies -->
    <matan-home
      :random-movies="randomMovies"
      :search-movies="searchMovies"
      :loading="loading"
      :total-search-results="totalSearchResults"
      :current-page="search.page"
      @on-next-page="onNextPage"
      @on-prev-page="onPrevPage"
    />
  </div>
</template>

<script>
import initObdbAPI from "../api/omdb"
import { OMDB_RANDOM_SEARCH } from "../configs"

// define omdb api
const obdbClient = initObdbAPI()

export default {
  // local state
  data() {
    return {
      // search input
      search: {
        input: "",
        page: 1,
        select: {
          value: "movie",
          options: [
            { display: "Movies", value: "movie" },
            { display: "Tv Shows", value: "series" }
          ]
        }
      },

      // define random movies
      randomMovies: [],

      // define movies/tvshows by search
      searchMovies: [],

      // define total search api results
      totalSearchResults: 0,

      // set loader
      loading: false
    }
  },

  // mounted hook
  async mounted() {
    // pull random movies and tv shows
    this.randomMovies = await this.collectRandomMovies(10)
  },

    // methods
  methods: {
    /**
     * collectRandomMovies pulls 20 movies and
     * tv shows
     *
     * @param {number} numberOfMovies - number of random movies
     */
    async collectRandomMovies(numberOfMovies) {
      // generate random search keys
      const firstRandomKey = this.pickRandomKey()
      const secondRandomKey = this.pickRandomKey()

      // pull random 10 movies from 2021
      const mvPr = obdbClient.search(
        {
          y: OMDB_RANDOM_SEARCH.year,
          s: firstRandomKey,
          type: OMDB_RANDOM_SEARCH.movies
        }
      )

      // pull random 10 tv shows from 2021
      const srPr = obdbClient.search(
        {
          y: OMDB_RANDOM_SEARCH.year,
          s: secondRandomKey,
          type: OMDB_RANDOM_SEARCH.series
        }
      )

      // resolve promises and
      // get sub-array of first n elements after shuffled
      const responses = (await Promise.all([mvPr, srPr])).flat()
      const randomMovies = (responses.map(res => res.data.Search)).flat()
      return randomMovies.sort(() => 0.5 - Math.random()).slice(0, numberOfMovies)
    },

    /**
     * onSearchClick emits search to omdb API
     */
    async onSearchClick() {
      // set loader
      this.loading = true

      // make api search
      const { data } = await obdbClient.search(
        {
          s: this.search.input,
          type: this.search.select.value,
          page: this.search.page
        }
      )

      // set movies data
      this.searchMovies = data.Search
      this.totalSearchResults = Number(data.totalResults)
      this.loading = false
    },

    /**
     * onNextPage handle next page
     * on search request
     */
    async onNextPage() {
      this.search.page += 1

      await this.onSearchClick()
    },

    /**
     * onPrevPage handle prev page
     * on search request
     */
    async onPrevPage() {
      this.search.page -= 1

      await this.onSearchClick()
    },

    /**
     * pick random key search for latest
     * movies/tvshows
     */
    pickRandomKey() {
      const { searchWords } = OMDB_RANDOM_SEARCH
      return searchWords[Math.floor(Math.random() * searchWords.length)]
    }
  }
}
</script>

<style scoped lang="scss">
@import "../style/_main.scss";

.background-logo {
  background-image: url("../assets/images/latest-movies.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;

  font-family: $title-font-family;
  font-weight: 500;
  font-size: $title-font-size;

  &-content {
    height: 45rem;
  }

  &--subtitle {
    font-family: $root-font-family;
    font-weight: 500;
    font-size: $root-font-size;
  }
}

</style>
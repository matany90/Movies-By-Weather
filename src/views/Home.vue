<template>
  <div>
    <!-- Header -->
    <matan-header
      :selectedHeader="selectedHeader"
      :header-options="headerOptions"
    />

    <!-- Background logo -->
    <div class="background-logo">
      <div class="background-logo-content flex flex-row">
        <div class="w-1/2" />
        <div class="w-1/2 text-center mt-40 p-5">
          {{ $t("home.title") }}
        </div>
      </div>
    </div>

    <!-- Render movies -->
    <matan-home
      :random-movies="randomMovies"
      :search-movies="searchMovies"
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
      // selected header
      selectedHeader: "home",

      // define random movies
      randomMovies: [],

      // define movies/tvshows by search
      searchMovies: [],

      // define header options
      headerOptions: [
        {
          id: "home",
          label: this.$t("home.header.home"),
          cb: () => this.selectedHeader = "home"
        },
        {
          id: "movies",
          label: this.$t("home.header.movies"),
          cb: () => this.selectedHeader = "movies"
        },
        {
          id: "tv-shows",
          label: this.$t("home.header.tvShows"),
          cb: () => this.selectedHeader = "tv-shows"
        }
      ]
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
      // pull random 10 movies from 2021
      const mvPr = obdbClient.search(
        {
          y: OMDB_RANDOM_SEARCH.year,
          s: this.pickRandomKey,
          type: OMDB_RANDOM_SEARCH.movies
        }
      )

      // pull random 10 tv shows from 2021
      const srPr = obdbClient.search(
        {
          y: OMDB_RANDOM_SEARCH.year,
          s: this.pickRandomKey,
          type: OMDB_RANDOM_SEARCH.series
        }
      )

      // resolve promises and
      // get sub-array of first n elements after shuffled
      const responses = (await Promise.all([mvPr, srPr])).flat()
      const randomMovies = (responses.map(res => res.data.Search)).flat()
      return randomMovies.sort(() => 0.5 - Math.random()).slice(0, numberOfMovies)

      // // and pull data by id
      // return Promise.all(
      //   shuffled
      //     .map(async omdbEl => {
      //       const { data = {} } = await obdbClient.get(omdbEl.imdbID)
      //       return data
      //     })
      // )
    }
  },

  // computed properties
  computed: {
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
  background-image: url("../assets/images/latest-movies-2.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 2%;

  font-family: $title-font-family;
  font-weight: 500;
  font-size: $title-font-size;

  &-content {
    height: 45rem;
  }
}

</style>
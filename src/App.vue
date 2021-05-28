<template>
  <!-- init app instance -->
  <m-app id="app">
    <!-- Header for all routes -->
    <matan-header
      :selectedHeader="selectedHeader"
      :header-options="headerOptions"
    />

    <!-- init router -->
    <router-view />
  </m-app>
</template>

<script>
export default {
  // local state
  data() {
    return {
      // selected header
      selectedHeader: "home",

      // define header options
      headerOptions: [
        {
          id: "home",
          label: this.$t("home.header.home")
        },
        {
          id: "movies",
          label: this.$t("home.header.movies")
        },
        {
          id: "tv-shows",
          label: this.$t("home.header.tvShows")
        }
      ]
    }
  }
}
</script>


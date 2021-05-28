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
          Welcome to Matan's Movies World!
        </div>
      </div>
    </div>

    <!-- Render movies -->
    <matan-home v-if="selectedHeader === 'home'" />
    <matan-movies v-else-if="selectedHeader === 'movies'" />
    <matan-tvshows v-else />

  </div>
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
          label: "Home",
          cb: () => this.selectedHeader = "home"
        },
        {
          id: "movies",
          label: "Movies",
          cb: () => this.selectedHeader = "movies"
        },
        {
          id: "tv-shows",
          label: "Tv Shows",
          cb: () => this.selectedHeader = "tv-shows"
        }
      ]
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
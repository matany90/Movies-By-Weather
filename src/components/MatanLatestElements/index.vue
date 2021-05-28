<template>
  <div class="matan-latest-elements">
    <!-- Title -->
    <div class="matan-latest-elements--title text-center text-4xl mt-20">
      Latest Movies and Tv Shows of 2021
    </div>

    <!-- Info -->
    <div class="matan-latest-elements--info text-center mt-10">
      Here is a collection of ten recommended movies and TV shows from 2021. <br /> To search for specific movies or TV shows, click on the appropriate section in the top toolbar.
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../style/_main.scss";

.matan-latest-elements {
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
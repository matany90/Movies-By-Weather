<template>
  <div class="matan-footer w-full">
    <div class="h-full flex justify-center text-center flex-col">
      <!-- footer title and icon -->
      <div class="w-full cursor-pointer flex flex-col justify-center mb-5">
        <!-- image -->
        <div class="flex justify-center">
          <img src="@/assets/images/matan-logo.png" class="w-28" />
        </div>

        <!-- title -->
        <div class="matan-footer--logo">{{ $t("headers.logo.title") }}</div>
      </div>

      <div class="matan-footer--buttons mb-10 mt-4">
        <m-icon
          v-for="(buttonIcon, i) in buttonIcons"
          :key="i"
          :name="buttonIcon.name"
          type="button"
          class="matan-footer--buttons--icon md:ml-5 md:mr-5 ml-3 mr-3"
          @click="onClickIcon(buttonIcon)"
        />
      </div>
      <!-- Made by -->
      <div class="matan-footer--made-by mb-36">
        {{ $t("home.footer.madeBy") }}
      </div>
    </div>
  </div>
</template>

<script>
import { INTERNAL_LINKS } from "../../configs"

export default {
  // local state
  data() {
    // button icons
    return {
      buttonIcons: [
        {
          name: "facebook",
          link: INTERNAL_LINKS.facebookLink
        },
        {
          name: "linkedin",
          link: INTERNAL_LINKS.linkedinLink
        },
        {
          name: "cv",
          link: INTERNAL_LINKS.cvLink
        },
        {
          name: "github",
          link: INTERNAL_LINKS.githubLink
        },
        {
          name: "mail",
          link: INTERNAL_LINKS.mailLink
        }
      ]
    }
  },

  // methods
  methods: {
    // redirect to url on click
    onClickIcon(buttonIcon) {
      window.location.href = buttonIcon.link
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/_main.scss";

.matan-footer {
  background-image: url('../../assets/images/footer.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 90vh;

  @include media("<tablet") {
    height: 70vh;
  }

  &--buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }

  // made by
  &--made-by {
    font-size: $made-by-font-size;
  }

  // logo
  &--logo {
    font-family: $card-title-font-family;
    font-weight: $card-title-font-weight;
    font-size: $card-title-font-size;
  }
}
</style>
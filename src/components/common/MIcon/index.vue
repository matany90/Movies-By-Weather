<template>
  <div class="m-icon" v-on="$listeners">
    <div v-if="type === 'button'" class="m-icon--button">
      <img :src="iconPath" class="m-icon--button--svg" />
    </div>
    <img v-else :src="iconPath" class="m-icon--svg" />
  </div>
</template>

<script>
export default {
  // define props
  props: {
    // type
    type: {
      type: String,
      default: "default"
    },

    // icon's name
    name: {
      type: String,
      required: true
    }
  },

  // computed values
  computed: {
    /**
     * Get icon path
     */
    iconPath() {
      let name = this.name
      let endWith = "svg"
      if (this.name.includes(".png")) {
        name = this.name.split(".")[0]
        endWith = "png"
      }

      return require(`../../../assets/icons/${name}.${endWith}`)
    }
  }
}
</script>

<style lang="scss">
@import "../../../style/_main.scss";

.m-icon {
  &--svg {
    width: 100%;
    height: 100%;
  }

  &--button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 47px;
    height: 47px;
    border-radius: $icon-button-border-radius;
    border: 2px solid map-get($matan-colors, "primary");
    background: transparent;
    @include transition(background 0.4s);

    &--svg {
      width: 40%;
      height: 40%;
      filter: brightness(0) invert(1);
    }

    &:hover {
      cursor: pointer;
      background: white
    }

    // change icon's color on parent hover
    &:hover > .m-icon--button--svg {
      filter: none;
    }
  }
}
</style>

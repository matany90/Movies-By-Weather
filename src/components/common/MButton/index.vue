<template>
  <button
    :disabled="disabled"
    :type="type"
    :class="classList"
    v-on="$listeners"
  >
    <m-loading
      style="display: flex; justify-content: center; align-items: center"
      v-if="loading"
    />
    <slot v-else></slot>
  </button>
</template>

<script>
/**
 * Define the m-button component
 */
export default {
  // set component name
  name: "m-button",

  // external props
  props: {
    // is text button
    text: {
      type: Boolean,
      default: false
    },

    // color of the button
    color: {
      type: String,
      default: "primary"
    },

    // should render loading circle
    loading: {
      type: Boolean,
      default: false
    },

    // should disable btn
    disabled: {
      type: Boolean,
      default: false
    },

    // special type
    type: {
      type: String,
      default: "button"
    },

    // rounded button
    rounded: {
      type: Boolean,
      default: false
    }
  },

  // calculated props
  computed: {
    /**
     * The class list for the button
     */
    classList() {
      return [
        "m-button",
        this.rounded ? "m-button--rounded" : undefined,
        this.disabled ? "m-button--disabled" : undefined,
        this.loading ? "m-button--loading" : undefined,
        this.color === "primary" ? "m-button--primary" : undefined
      ]
    }
  }
}
</script>

<style lang="scss">
@import "../../../style/_main.scss";

$btn-height: 50px;

// button colors
$primary: map-deep-get($matan-colors, "primary");

.m-button {
  // general
  user-select: none;

  // text
  color: white;
  white-space: nowrap;
  font-size: 1rem;
  font-family: $root-font-family;
  text-decoration: none;
  letter-spacing: $btn-letter-spacing;
  font-weight: map-get($font-weights, "black");

  // button
  outline: 0;
  width: 120px;
  margin: 5px 0;
  padding: 0 2px;
  cursor: pointer;
  height: $btn-height;
  box-shadow: none !important;
  background-position: center;
  border-radius: $border-radius;

  @include transition(background 0.3s);
  // @include color-mixin;

  &--rounded {
    border-radius: 10vh;
  }

  &--primary {
    color: $primary;
    background: transparent;
    border: 2px solid $primary;

    &:hover {
      color: white;
      background: $primary;
    }
  }

  &--loading {
    cursor: progress;
  }

  &--disabled {
    cursor: not-allowed;
  }
}
</style>

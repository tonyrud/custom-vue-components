<template>
  <span
    :class="{
            upper: upper,
            h1: level == '1',
            h2: level == '2',
            h3: level == '3',
            h4: level == '4',
            h5: level == '5',
            h6: level == '6',
            subheader: subHeader,
        }"
    class="heading__text"
  >
    <slot />
  </span>
</template>

<script>
export default {
  name: 'VHeadline',
  props: {
    /**
     * sets headline to uppercase
     */
    upper: {
      type: Boolean,
      default: false,
    },
    /**
     * sets the level of the headline
     * must be one of the following: 1, 2, 3, 4, 5, 6
     */
    level: {
      type: [String, Number],
      default: '1',
    },
    /**
     * sets header to a blue subheader
     */
    subHeader: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped rel="stylesheet/scss" lang="scss" type="text/scss">
.heading__text {
  color: #333;
  display: inline-block;
  font-weight: 600;

  &.upper {
    text-transform: uppercase;
  }

  &.h1 {
    font-size: 52px;
  }

  &.h2 {
    font-size: 44px;
  }

  &.h3 {
    font-size: 32px;
  }

  &.h4 {
    font-size: 28px;
  }

  &.h5 {
    font-size: 24px;
  }

  &.h6 {
    font-size: 18px;
  }

  &.subheader {
    color: lightblue;
    font-size: 16px;
  }
}
</style>

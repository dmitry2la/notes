<template>
  <label for="day-night-switch">
    <input
      id="day-night-switch"
      type="checkbox"
      class="day-night-switch__input"
      v-model="checkedValue">
    <div class="day-night-switch__check"></div>
  </label>
</template>

<script>
export default {
  name: 'AppChangeTheme',
  props: {
    defaultState: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentState: false
    }
  },
  computed: {
    checkedValue: {
      get () {
        return this.defaultState
      },
      set (newValue) {
        this.currentState = newValue
        this.$emit('change', newValue)
      }
    }
  }
}
</script>

<style lang="scss">
  .day-night-switch__input {
    -webkit-appearance: none;
    visibility: hidden;
    display: none
  }
  .day-night-switch__check {
    position: relative;
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: transform 0.5s;
    background: var(--background-block-color);
    cursor: pointer;
    overflow: hidden;
  }
  .day-night-switch__input:checked ~ .day-night-switch__check {
    background: var(--background-block-color);
  }
  .day-night-switch__check:before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 30px;
    height: 30px;
    background: url("/img/sun.png") no-repeat;
    transition: 0.5s;
  }
  .day-night-switch__input:checked ~ .day-night-switch__check:before {
    transform: translateX(-50px);
  }
  .day-night-switch__check:after {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 30px;
    height: 30px;
    background: url("/img/moon.png") no-repeat;
    transition: 0.5s;
    transform: translateX(50px);
  }
  .day-night-switch__input:checked ~ .day-night-switch__check:after {
    transform: translateX(0);
  }
</style>

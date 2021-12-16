<template>
  <div class="switch-button-wrapper">
    <input type="checkbox" id="switch-button" class="switch-button" v-model="checkedValue">
    <label for="switch-button" class="switch-button-text"><slot></slot></label>
  </div>
</template>

<script>
export default {
  name: 'BaseSwitchButton',
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
  .switch-button {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 22px;
    margin: 0;
    vertical-align: top;
    background: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 30px;
    outline: none;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    transition: all $duration;
  }
  .switch-button::after {
    content: "";
    display: inline-block;
    position: absolute;
    left: 1px;
    top: 1px;
    width: 18px;
    height: 18px;
    background-color: $main-color;
    border-radius: 50%;
    transform: translateX(0);
    transition: all $duration;
  }
  .switch-button:checked::after {
    transform: translateX(100%);
    background-color: var(--background-color);
  }
  .switch-button:checked {
    background-color: $main-color;
  }
  .switch-button-text {
    margin-left: 5px;
    color: var(--text-color);
    font-size: 18px;
  }
</style>

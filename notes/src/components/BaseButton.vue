<template>
  <button
    :class="['base-button', kind ? 'base-button--' + kind : '']"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    kind: String
  }
}
</script>

<style lang="scss">
  .base-button {
    font-size: 16px;
    width: 100%;
    height: 40px;
    border-radius: 4px;
    border: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $main-color;
    color: var(--button-text-color);
    &--gray {
      background: var(--button-color);
    }
    &--red {
      background: $error-color;
    }
  }
</style>

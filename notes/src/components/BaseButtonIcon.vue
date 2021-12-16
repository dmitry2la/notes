<template>
  <button
    class="material-icons"
    :class="['base-button-icon', kind ? 'base-button-icon--' + kind : '']"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButtonIcon',
  props: {
    kind: String
  }
}
</script>

<style lang="scss">
  .base-button-icon {
    color: var(--text-color);
    background: var(--background-color);
    border: 0;
    outline: 0;
    cursor: pointer;
    margin-left: 20px;
    &--red:hover {
      color: $error-color;
    }
    &--main:hover {
      color: $main-color;
    }
  }
</style>

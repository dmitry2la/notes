<template>
  <div class="app-menu-item-wrapper">
    <div class="app-menu-item">
      <div class="app-menu-item__icon material-icons">{{ icon }}</div>
      <div class="app-menu-item__name">{{ name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppMenuItem',
  props: {
    name: String,
    icon: String
  }
}
</script>

<style lang="scss">
  .app-menu-item-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    padding: 0 5px 0 5px;
  }
  .app-menu-item {
    width: 100%;
    text-align: center;
    cursor: pointer;
    transition: $duration;
    &:hover > div {
      color: $main-color;
    }
  }
  .app-menu-item__name {
    font-size: 20px;
    word-wrap: break-word;
  }

</style>

<template>
  <div class="main-bg">
    <div class="main-wrapper">
      <app-menu />
      <router-view />
    </div>
  </div>
</template>

<script>

import AppMenu from '../components/AppMenu'
import messages from '../utils/messages'
export default {
  name: 'MainLayout',
  components: { AppMenu },
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (fbError) {
      this.$notify({
        text: messages[fbError.code] || 'Something went wrong',
        type: 'error',
        duration: 3000
      })
    }
  }
}
</script>

<style lang="scss">
  .main-bg {
    background: var(--background-color);
    width: 100%;
    height: 100%;
  }
  .main-wrapper {
    display: flex;
    height: 100%;
  }
</style>

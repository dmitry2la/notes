<template>
  <div id="app" :class="theme">
    <notifications />
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
export default {
  components: {
    AuthLayout, MainLayout
  },
  computed: {
    layout () {
      return (this.$route.meta.layout || 'auth') + '-layout'
    },
    theme () {
      return this.$store.state.theme
    }
  }
}
</script>

<style lang="scss">
  #app {
    height: 100%;
  }
</style>

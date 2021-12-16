<template>
  <div class="app-menu-wrapper">
    <div class="app-menu" v-if="!loading">
      <div class="app-menu__account">
        <router-link
          to="/settings"
          :class="{active : isActive('/settings')}"
        >
          <app-menu-item
            :name="username"
            :icon="'account_box'"
          />
        </router-link>
      </div>
      <div class="app-menu__categories">
        <router-link
          to="/notes"
          :class="{active : isActive('/notes')}"
        >
          <app-menu-item :name="'Notes'" :icon="'sticky_note_2'"/>
        </router-link>
        <router-link
          to="/targets"
          :class="{active : isActive('/targets')}"
        >
          <app-menu-item :name="'Targets'" :icon="'emoji_events'"/>
        </router-link>
      </div>
      <div class="app-menu__theme-switcher">
        <app-change-theme
          :default-state="defaultStateSwitch"
          @change="changeTheme"
        />
      </div>
      <div class="app-menu__logout" @click="logout">
        <app-menu-item :name="'Logout'" :icon="'logout'"/>
      </div>
    </div>
  </div>
</template>

<script>
import AppMenuItem from './AppMenuItem'
import AppChangeTheme from './AppChangeTheme'
export default {
  name: 'AppMenu',
  components: { AppChangeTheme, AppMenuItem },
  data () {
    return {
      theme: '',
      defaultStateSwitch: true,
      loading: true,
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$store.dispatch('logout')
        await this.$router.push('/login?message=logout')
      } catch (e) {}
    },
    isActive (path) {
      return this.$route.path.includes(path)
    },
    async changeTheme (value) {
      value ? this.theme = 'theme-dark' : this.theme = 'theme-light'
      try {
        await this.$store.dispatch('changeTheme', this.theme)
        this.$store.commit('setTheme', this.theme)
      } catch (e) {}
    }
  },
  async mounted () {
    try {
      this.userInfo = await this.$store.dispatch('getUserInfo')
      this.$store.commit('setUsername', this.userInfo.username)
      this.$store.commit('setTheme', this.userInfo.theme)
      // eslint-disable-next-line no-unused-expressions
      this.$store.state.theme === 'theme-light' ? this.defaultStateSwitch = false : true
      this.loading = false
    } catch (e) {}
  },
  computed: {
    username () {
      return this.$store.state.username
    }
  }
}
</script>

<style lang="scss">
  .app-menu-wrapper {
    background: var(--background-block-color);;
    height: 100%;
    min-width: 150px;
    max-width: 150px;
  }
  .app-menu {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .app-menu__account{
    margin-top: 50px;
  }
  .app-menu__categories {
    margin-top: 200px;
  }
  .app-menu__theme-switcher {
    display: flex;
    justify-content: center;
    margin-top: auto;
    margin-bottom: 50px;
  }
  .app-menu__logout {
    margin-bottom: 20px;
  }
  .router-link-active.active * {
    color: $main-color;
  }
</style>

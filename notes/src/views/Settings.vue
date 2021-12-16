<template>
  <div class="main-container">
    <div class="settings-wrapper">
      <h1 class="settings-title">Settings</h1>
      <div class="settings-row">
        <div class="settings-row-err">
          <div
            v-if="$v.username.$dirty && !$v.username.required"
            class="auth-input-err"
          >
            Username is required
          </div>
        </div>
        <label for="username" class="settings-row__title">Username</label>
        <input
          type="text"
          id="username"
          class="settings-row__value"
          v-model.trim="username"
          maxlength="12"
          :class="{invalid: ($v.username.$dirty && !$v.username.required)}"
        >
      </div>
      <div class="settings-row">
        <div class="settings-row-err">
          <div
            v-if="password !== '' && !$v.password.minLength"
            class="auth-input-err"
          >
            Minimum password length of 6
          </div>
          <div
            v-else-if="password !== confirmPassword"
            class="auth-input-err"
          >
            Passwords mismatch
          </div>
        </div>
        <label for="password" class="settings-row__title">Password</label>
        <input
          type="password"
          id="password"
          class="settings-row__value"
          v-model.trim="password"
          :class="{invalid: (password !== '' && !$v.password.minLength) || (password !== confirmPassword)}"
        >
      </div>
      <div class="settings-row">
        <div class="settings-row-err">
          <div
            v-if="confirmPassword !== '' && !$v.confirmPassword.minLength"
            class="auth-input-err"
          >
            Minimum password length of 6
          </div>
        </div>
        <label for="confirmPassword" class="settings-row__title">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          class="settings-row__value"
          v-model.trim="confirmPassword"
          :class="{invalid: (confirmPassword !== '' && !$v.confirmPassword.minLength) || (password !== confirmPassword)}"
        >
      </div>
      <base-button
        class="settings__save-btn"
        @click.native="saveSettings"
      >
        Save
      </base-button>
    </div>
  </div>
</template>

<script>
import BaseButton from '../components/BaseButton'
import { required, minLength } from 'vuelidate/lib/validators'
import messages from '../utils/messages'
export default {
  name: 'Settings',
  components: {
    BaseButton
  },
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: ''
    }
  },
  validations: {
    username: { required },
    password: { minLength: minLength(6) },
    confirmPassword: { minLength: minLength(6) }
  },
  methods: {
    async saveSettings () {
      try {
        if (this.$v.$invalid || (this.password !== this.confirmPassword)) {
          this.$v.$touch()
          return
        }
        if (this.password !== '' && this.confirmPassword !== '') {
          await this.$store.dispatch('changePassword', this.password)
        }
        await this.$store.dispatch('changeUsername', this.username)
        this.$store.commit('setUsername', this.username)
        this.$notify({
          text: messages.settings_saved,
          type: 'notify',
          duration: 3000
        })
      } catch (e) {}
    }
  },
  async mounted () {
    const userInfo = await this.$store.dispatch('getUserInfo')
    this.username = userInfo.username
  }
}
</script>

<style lang="scss">
  .settings-title {
    margin-bottom: 30px;
  }
  .settings-row {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    position: relative;
    &__title {
      min-width: 150px;
    }
    &__value {
      max-width: 300px;
      width: 100%;
      background: var(--background-block-color);
      border-radius: 4px;
      border: 1px solid var(--border-color);
      height: 40px;
      padding: 0 10px 0 10px;
      font-size: 16px;
    }
  }
  .settings-row-err {
    position: absolute;
    top: -15px;
    left: 100px;
  }
  .settings__save-btn {
    width: 150px;
    margin-top: 40px;
  }
</style>

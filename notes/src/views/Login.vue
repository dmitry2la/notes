<template>
  <form @submit.prevent="onSubmit">
    <div class="auth-input-block">
      <div class="auth-input-err-wrapper">
        <div
          v-if="$v.email.$dirty && !$v.email.required"
          class="auth-input-err"
        >
          Email is required
        </div>
      </div>
      <div class="auth-input">
        <label for="email" class="auth-input_icon material-icons">alternate_email</label>
        <input
          id="email"
          type="text"
          placeholder="Email"
          v-model.trim="email"
          :class="{invalid: $v.email.$dirty && !$v.email.required }"
        >
      </div>
    </div>
    <div class="auth-input-block">
      <div class="auth-input-err-wrapper">
        <div
          v-if="$v.password.$dirty && !$v.password.required"
          class="auth-input-err"
        >
          Password is required
        </div>
      </div>
      <div class="auth-input auth-input-password">
        <label for="password" class="auth-input_icon material-icons">lock</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          v-model.trim="password"
          :class="{invalid: $v.password.$dirty && !$v.password.required }"
        >
      </div>
    </div>
    <base-button :type="'submit'">
      Log In
    </base-button>
    <router-link to="/registration" class="auth-text" >
      Sign Up
      <span class="material-icons">arrow_right_alt</span>
    </router-link>
  </form>
</template>

<script>
import BaseButton from '../components/BaseButton'
import { required } from 'vuelidate/lib/validators'
import messages from '../utils/messages'

export default {
  name: 'Login',
  components: {
    BaseButton
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    email: { required },
    password: { required }
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$notify({
        text: messages[this.$route.query.message],
        type: 'notify',
        duration: 3000
      })
    }
  },
  methods: {
    async onSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData)
        await this.$router.push('/notes')
      } catch (e) {}
    }
  }
}
</script>

<style lang="scss">

</style>

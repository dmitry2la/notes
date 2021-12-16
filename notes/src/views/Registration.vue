<template>
  <form @submit.prevent="onSubmit">
    <h1 class="auth-title">Sign up</h1>
    <div class="auth-input-block">
      <div class="auth-input-err-wrapper">
        <div
          v-if="$v.username.$dirty && !$v.username.required"
          class="auth-input-err"
        >
          Username is required
        </div>
      </div>
      <div class="auth-input">
        <label for="login" class="auth-input_icon material-icons">account_box</label>
        <input
          id="login"
          type="text"
          placeholder="Username"
          v-model.trim="username"
          maxlength="12"
          :class="{invalid: ($v.username.$dirty && !$v.username.required)}"
        >
      </div>
    </div>
    <div class="auth-input-block">
      <div class="auth-input-err-wrapper">
        <div
          v-if="$v.email.$dirty && !$v.email.required"
          class="auth-input-err"
        >
          Email is required
        </div>
        <div
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="auth-input-err"
        >
          Incorrect email
        </div>
      </div>
      <div class="auth-input">
        <label for="email" class="auth-input_icon material-icons">alternate_email</label>
        <input
          id="email"
          type="text"
          placeholder="Email"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }"
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
        <div
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          class="auth-input-err"
        >
          Minimum password length of 6
        </div>
        <div
          v-else-if="confirmPassword !== password"
          class="auth-input-err"
        >
          Passwords mismatch
        </div>
      </div>
      <div class="auth-input">
        <label for="password" class="auth-input_icon material-icons">lock</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength) || (confirmPassword !== password) }"
        >
      </div>
    </div>
    <div class="auth-input-block">
      <div class="auth-input-err-wrapper">
        <div
          v-if="$v.confirmPassword.$dirty && !$v.confirmPassword.required"
          class="auth-input-err"
        >
          Password is required
        </div>
        <div
          v-else-if="$v.confirmPassword.$dirty && !$v.confirmPassword.minLength"
          class="auth-input-err"
        >
          Minimum password length of 6
        </div>
      </div>
      <div class="auth-input auth-input-password">
        <label for="confirmPassword" class="auth-input_icon material-icons">lock</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm password"
          v-model.trim="confirmPassword"
          :class="{invalid: ($v.confirmPassword.$dirty && !$v.confirmPassword.required) || ($v.confirmPassword.$dirty && !$v.confirmPassword.minLength) || (confirmPassword !== password) }"
        >
      </div>
    </div>
    <base-button :type="'submit'">
      Sing up
    </base-button>
    <router-link to="/login" class="auth-text" >
      Log In
      <span class="material-icons">arrow_right_alt</span>
    </router-link>
  </form>
</template>

<script>
import BaseButton from '../components/BaseButton'
import { email, required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'Registration',
  components: { BaseButton },
  data () {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  validations: {
    username: { required },
    password: { required, minLength: minLength(6) },
    confirmPassword: { required, minLength: minLength(6) },
    email: { email, required }
  },
  methods: {
    async onSubmit () {
      if (this.$v.$invalid || (this.password !== this.confirmPassword)) {
        this.$v.$touch()
        return
      }
      const formData = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('register', formData)
        await this.$router.push('/login?message=success_register')
      } catch (e) {}
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="auth-bg">
    <div class="auth-container">
      <div class="auth-block">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import messages from '../utils/messages'
export default {
  name: 'AuthLayout',
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
  .theme-btn {
    position: absolute;
    left: 40px;
    top: 40px;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
  .auth-bg {
    background: var(--background-color);
    height: 100%;
  }
  .auth-container{
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
  }
  .auth-block {
    padding: 15px;
  }
  .auth-text {
    color: $main-color;
    margin-top: 10px;
    display: flex;
    align-items: center;
    & span {
      margin-left: 10px;
      color: $main-color;
    }
  }
  .auth-title {
    color: #FFF;
    text-align: center;
    margin-bottom: 20px;
  }
  .auth-input {
    height: 40px;
    margin-bottom: 10px;
    margin-top: 5px;
    display: flex;
    &_icon {
      height: 40px;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #616161;
    }

    & input {
      padding: 0 10px 0 10px;
      border-radius: 4px;
      border: 0;
      color: #000000;
      font-size: 14px;
    }
  }
  .auth-input-err {
    font-size: 12px;
    color: red;
    margin-left: 50px;
  }
  .auth-input-err-wrapper {
    height: 15px;
  }
  .auth-input-password {
    margin-bottom: 30px;
  }
</style>

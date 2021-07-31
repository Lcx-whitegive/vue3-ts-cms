<template>
  <div class="login">
    <login-panel class="login-panel" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './cpns/LoginPanel.vue'

export default defineComponent({
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.login {
  position: relative;
  height: 100%;
  background: url('~assets/img/login-bg.svg') no-repeat;
  .login-panel {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

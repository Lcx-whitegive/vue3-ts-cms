<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTabName">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登陆</span>
        </template>
        <login-account ref="loginAccountRef" />
      </el-tab-pane>
      <el-tab-pane name="mobile">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone ref="loginPhoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control" v-if="currentTabName === 'account'">
      <el-checkbox class="remember-me" v-model="isRememberPassword"
        >记住我</el-checkbox
      >
      <el-link type="primary" class="forget-password">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './LoginAccount.vue'
import LoginPhone from './LoginPhone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isRememberPassword = ref(true)
    const currentTabName = ref('account')
    const loginAccountRef = ref<InstanceType<typeof LoginAccount>>()
    const loginPhoneRef = ref<InstanceType<typeof LoginPhone>>()
    const handleLoginClick = () => {
      if (currentTabName.value === 'account') {
        loginAccountRef.value?.accountLoginAction(isRememberPassword.value)
      } else {
        loginPhoneRef.value?.phoneLoginAction()
      }
    }
    return {
      isRememberPassword,
      handleLoginClick,
      loginAccountRef,
      loginPhoneRef,
      currentTabName
    }
  }
})
</script>

<style lang="less" scoped>
.login-panel {
  width: 320px;
  .title {
    text-align: center;
  }
  .account-control {
    height: 20px;
    margin-top: 8px;
    line-height: 20px;
    .remember-me {
      float: left;
    }
    .forget-password {
      float: right;
    }
  }
  .login-btn {
    width: 100%;
    margin-top: 6px;
  }
}
</style>

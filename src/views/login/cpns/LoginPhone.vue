<template>
  <div class="login-phone">
    <el-form :model="mobileInfo" :rules="rules" ref="loginPhoneFormRef">
      <el-form-item label="手机号" label-width="70px" prop="mobile">
        <el-input v-model="mobileInfo.mobile"></el-input>
      </el-form-item>
      <el-form-item label="验证码" label-width="70px" prop="verifyCode">
        <el-input
          v-model="mobileInfo.verifyCode"
          class="verify-code-input"
        ></el-input>
        <el-button type="primary" size="small" class="verify-btn"
          >获取验证码</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

import { rules } from '../config/phone-config'

import { ElForm } from 'element-plus'
export default defineComponent({
  setup() {
    const mobileInfo = reactive({
      mobile: '',
      verifyCode: ''
    })
    const loginPhoneFormRef = ref<InstanceType<typeof ElForm>>()
    const phoneLoginAction = () => {
      loginPhoneFormRef.value?.validate((valid) => {
        if (valid) {
          console.log('phone开始登录')
        }
      })
    }
    return {
      mobileInfo,
      rules,
      loginPhoneFormRef,
      phoneLoginAction
    }
  }
})
</script>

<style lang="less" scoped>
.login-phone {
  .verify-code-input {
    width: 100px;
  }
  .verify-btn {
    margin-left: 20px;
  }
}
</style>

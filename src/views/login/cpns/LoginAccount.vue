<template>
  <div class="login-account">
    <el-form :model="accountInfo" :rules="rules" ref="loginAccountFormRef">
      <el-form-item label="账号" label-width="70px" prop="name">
        <el-input v-model="accountInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="70px" prop="password">
        <el-input v-model="accountInfo.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

import { rules } from '../config/account-config'

import { ElForm } from 'element-plus'
export default defineComponent({
  setup() {
    const accountInfo = reactive({
      name: '',
      password: ''
    })
    const loginAccountFormRef = ref<InstanceType<typeof ElForm>>()
    const accountLoginAction = () => {
      loginAccountFormRef.value?.validate((valid) => {
        if (valid) {
          console.log('account开始登录')
        }
      })
    }
    return {
      accountInfo,
      rules,
      accountLoginAction,
      loginAccountFormRef
    }
  }
})
</script>

<style scoped></style>

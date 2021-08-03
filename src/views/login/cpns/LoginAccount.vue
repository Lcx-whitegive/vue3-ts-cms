<template>
  <div class="login-account">
    <el-form :model="accountInfo" :rules="rules" ref="loginAccountFormRef">
      <el-form-item label="账号" label-width="70px" prop="name">
        <el-input v-model="accountInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="70px" prop="password">
        <el-input v-model="accountInfo.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

import { useStore } from 'vuex'

import { rules } from '../config/account-config'

import { ElForm } from 'element-plus'

import { localCache } from '@/utils/cache'
export default defineComponent({
  setup() {
    const accountInfo = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const store = useStore()
    const loginAccountFormRef = ref<InstanceType<typeof ElForm>>()

    // 账号方式登录
    const accountLoginAction = (isRememberPassword: boolean) => {
      loginAccountFormRef.value?.validate((valid) => {
        if (valid) {
          // 是否需要记住密码
          if (isRememberPassword) {
            // 本地缓存
            localCache.setCache('name', accountInfo.name)
            localCache.setCache('password', accountInfo.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 登录逻辑
          store.dispatch({
            type: 'loginModule/accountLoginAction',
            accountInfo: { ...accountInfo }
          })
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

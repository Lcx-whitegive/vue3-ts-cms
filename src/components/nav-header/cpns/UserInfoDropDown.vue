<template>
  <div class="user-info-dropdown">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          class="avatar"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          size="small"
        ></el-avatar>
        {{ name }}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
          <el-dropdown-item>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useStore } from '@/store'

export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => store.state.loginModule.userInfo.name)
    return {
      name
    }
  }
})
</script>

<style lang="less" scoped>
.user-info-dropdown {
  cursor: pointer;
  .avatar {
    vertical-align: middle;
  }
}
</style>

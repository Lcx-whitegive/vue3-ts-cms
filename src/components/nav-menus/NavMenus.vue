<template>
  <div class="nav-menus">
    <div class="logo">
      <img v-show="!isCollapse" src="~assets/img/logo.jpg" />
      <span v-show="!isCollapse" class="title">S1mple</span>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      unique-opened
      :default-active="currentPath"
    >
      <template v-for="item in userMenus" :key="item.id">
        <el-submenu :index="item.url">
          <template #title>
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>
          <template v-if="item.children">
            <template v-for="menuItem in item.children" :key="menuItem.id">
              <el-menu-item
                :index="menuItem.url"
                @click="handleMenuClick(menuItem)"
              >
                <template #title>{{ menuItem.name }}</template>
              </el-menu-item>
            </template>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useRouter, useRoute } from 'vue-router'

import { useStore } from '@/store'

export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const currentPath = route.path
    const userMenus = computed(() => {
      return store.state.loginModule.userMenus
    })
    // 导航跳转
    const handleMenuClick = (item: any) => {
      router.push(item.url)
    }
    return {
      userMenus,
      handleMenuClick,
      currentPath
    }
  }
})
</script>

<style lang="less" scoped>
.nav-menus {
  height: 100%;
  .logo {
    height: 50px;
    padding: 0 45px;
    line-height: 50px;
    img {
      width: 40px;
      margin-right: 5px;
      vertical-align: middle;
      border-radius: 50%;
    }
    .title {
      color: #fff;
    }
  }
  .el-menu {
    background-color: #545c64;
    border-right: none;
  }
}
</style>

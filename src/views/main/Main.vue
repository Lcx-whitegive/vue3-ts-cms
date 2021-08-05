<template>
  <div class="main">
    <el-container>
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <nav-menus :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <nav-header @changeFoldState="changeFoldState" />
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import NavMenus from '@/components/nav-menus/NavMenus.vue'
import NavHeader from '@/components/nav-header/NavHeader.vue'

export default defineComponent({
  components: {
    NavMenus,
    NavHeader
  },
  setup() {
    const isCollapse = ref(false)
    const changeFoldState = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return {
      changeFoldState,
      isCollapse
    }
  }
})
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
    transition: all 0.3s linear;
  }
  .el-header {
    height: 40px;
    background-color: #fff;
    line-height: 40px;
  }
  .el-main {
    background-color: #eee;
  }
}
</style>

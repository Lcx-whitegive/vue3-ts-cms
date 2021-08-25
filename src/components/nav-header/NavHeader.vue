<template>
  <div class="nav-header">
    <div>
      <i :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
      <span class="txt" @click="changeFoldState">{{
        isFold ? '展开' : '折叠'
      }}</span>
    </div>
    <div class="right">
      <div>
        <cx-breadcrumb :breadcrumbs="breadcrumbs" />
      </div>
      <div>
        <user-info-drop-down />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import { useStore } from '@/store'

import { useRoute } from 'vue-router'

import { mapBreadcrumbs } from '@/utils/mapMenus'

import UserInfoDropDown from './cpns/UserInfoDropDown.vue'
import CxBreadcrumb from '@/base-ui/cx-breadcrumb/CxBreadcrumb.vue'

export default defineComponent({
  emits: ['changeFoldState'],
  components: {
    UserInfoDropDown,
    CxBreadcrumb
  },
  setup(props, context) {
    let isFold = ref(false)
    const store = useStore()
    const route = useRoute()
    const breadcrumbs = computed(() => {
      const currentPath = route.path
      const userMenus = store.state.loginModule.userMenus
      return mapBreadcrumbs(userMenus, currentPath)
    })
    // 切换折叠状态
    const changeFoldState = () => {
      isFold.value = !isFold.value
      context.emit('changeFoldState', isFold.value)
    }
    return {
      isFold,
      changeFoldState,
      breadcrumbs
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  justify-content: space-between;
  .txt {
    margin-left: 10px;
    cursor: pointer;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
}
</style>

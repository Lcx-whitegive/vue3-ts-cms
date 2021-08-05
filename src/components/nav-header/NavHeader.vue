<template>
  <div class="nav-header">
    <i :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
    <span class="txt" @click="changeFoldState">{{
      isFold ? '展开' : '折叠'
    }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['changeFoldState'],
  setup(props, context) {
    let isFold = ref(false)
    // 切换折叠状态
    const changeFoldState = () => {
      isFold.value = !isFold.value
      context.emit('changeFoldState', isFold.value)
    }
    return {
      isFold,
      changeFoldState
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  .txt {
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>

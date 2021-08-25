<template>
  <div class="role">
    <div class="content">
      <cx-table
        v-bind="tableConfig"
        :list="roleList"
        @selectionChange="selectionChange"
      >
        <template #createAt="slotProps">
          <span>
            {{ $filters.formatTime(slotProps.row.createAt) }}
          </span>
        </template>
        <template #updateAt="slotProps">
          <span>
            {{ $filters.formatTime(slotProps.row.updateAt) }}
          </span>
        </template>
        <template #operation>
          <el-button size="mini" type="primary">修改</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
        <template #headerHandle>
          <el-button type="primary" size="small">新建角色</el-button>
        </template>
      </cx-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import { tableConfig } from './config'

import CxTable from '@/base-ui/cx-table/CxTable.vue'

export default defineComponent({
  name: 'Role',
  components: {
    CxTable
  },
  setup() {
    const store = useStore()
    store.dispatch({
      type: 'systemModule/getPageList',
      pageName: 'role',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const roleList = computed(() => store.state.systemModule.roleList)
    const roleCount = computed(() => store.state.systemModule.roleCount)
    const selectionChange = (selection: any) => {
      console.log(selection)
    }
    return {
      tableConfig,
      selectionChange,
      roleList,
      roleCount
    }
  }
})
</script>

<style scoped></style>

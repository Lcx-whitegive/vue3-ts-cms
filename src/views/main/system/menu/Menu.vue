<template>
  <div class="menu">
    <div class="content">
      <cx-table
        v-bind="tableConfig"
        :list="menuList"
        :queryInfo="queryInfo"
        @sizeChange="sizeChange"
        @currentChange="currentChange"
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
          <el-button type="primary" size="small">新建菜单</el-button>
        </template>
      </cx-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import { useStore } from '@/store'

import CxTable from '@/base-ui/cx-table/CxTable.vue'

import useQueryList from '@/hooks/useQueryList'
import useQueryPermissions from '@/hooks/useQueryPermissions'

import { tableConfig } from './config'

export default defineComponent({
  name: 'Menu',
  components: {
    CxTable
  },
  setup() {
    // 获取操作的权限
    const isCreate = useQueryPermissions('users', 'create')
    const isUpdate = useQueryPermissions('users', 'update')
    const isDelete = useQueryPermissions('users', 'delete')
    const isQuery = useQueryPermissions('users', 'query')
    const formData = ref(null)
    const {
      resetSearchFrom,
      searchList,
      sizeChange,
      currentChange,
      queryInfo,
      cxSearchRef,
      queryList
    } = useQueryList(formData, 'menu', isQuery)
    const store = useStore()
    queryList()
    const menuList = computed(() => store.state.systemModule.menuList)
    return {
      menuList,
      resetSearchFrom,
      searchList,
      sizeChange,
      currentChange,
      queryInfo,
      cxSearchRef,
      tableConfig,
      formData,
      isCreate,
      isUpdate,
      isDelete
    }
  }
})
</script>

<style scoped></style>

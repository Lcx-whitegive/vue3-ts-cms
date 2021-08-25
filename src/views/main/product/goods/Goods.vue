<template>
  <div class="goods">
    <div class="content">
      <cx-table
        v-bind="tableConfig"
        :list="goodsList"
        :listCount="goodsCount"
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
          <el-button type="primary" size="small">添加商品</el-button>
        </template>
        <template #image="slotProps">
          <el-image
            style="width: 50px; height: 50px"
            :src="slotProps.row.imgUrl"
            :preview-src-list="[slotProps.row.imgUrl]"
          >
          </el-image>
        </template>
        <template #status="slotProps">
          <el-button
            size="mini"
            :type="slotProps.row.status ? 'success' : 'danger'"
            plain
          >
            {{ slotProps.row.status ? '启用' : '禁用' }}
          </el-button>
        </template>
      </cx-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import { useStore } from '@/store'

import { tableConfig } from './config'

import useQueryList from '@/hooks/useQueryList'
import useQueryPermissions from '@/hooks/useQueryPermissions'

import CxTable from '@/base-ui/cx-table/CxTable.vue'

export default defineComponent({
  name: 'Goods',
  components: {
    CxTable
  },
  setup() {
    // 获取操作的权限
    const isCreate = useQueryPermissions('users', 'create')
    const isUpdate = useQueryPermissions('users', 'update')
    const isDelete = useQueryPermissions('users', 'delete')
    const isQuery = useQueryPermissions('users', 'query')
    const store = useStore()
    const formData = ref(null)
    const {
      resetSearchFrom,
      searchList,
      sizeChange,
      currentChange,
      queryInfo,
      cxSearchRef,
      queryList
    } = useQueryList(formData, 'goods', isQuery)

    queryList()
    const goodsList = computed(() => store.state.systemModule.goodsList)
    const goodsCount = computed(() => store.state.systemModule.goodsCount)
    return {
      tableConfig,
      resetSearchFrom,
      searchList,
      sizeChange,
      currentChange,
      queryInfo,
      cxSearchRef,
      goodsList,
      goodsCount,
      isCreate,
      isUpdate,
      isDelete
    }
  }
})
</script>

<style scoped></style>

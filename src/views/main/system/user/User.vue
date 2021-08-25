<template>
  <div class="user">
    <div class="search">
      <cx-higher-search
        v-bind="searchConfig"
        v-model="formData"
        ref="cxSearchRef"
      >
        <template #footer>
          <div class="handle-btns">
            <el-button @click="resetSearchFrom">重置</el-button>
            <el-button type="primary" @click="searchList">查询</el-button>
          </div>
        </template>
      </cx-higher-search>
    </div>
    <div class="content">
      <cx-table
        v-bind="tableConfig"
        :list="userList"
        @selectionChange="selectionChange"
        :listCount="userCount"
        :queryInfo="queryInfo"
        @sizeChange="sizeChange"
        @currentChange="currentChange"
      >
        <template #status="slotProps">
          <el-button
            size="mini"
            :type="slotProps.row.enable ? 'success' : 'danger'"
            plain
          >
            {{ slotProps.row.enable ? '启用' : '禁用' }}
          </el-button>
        </template>
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
        <template #operation="slotProps">
          <el-button
            size="mini"
            type="primary"
            v-if="isUpdate"
            @click="showEditUserDialog(slotProps.row, slotProps.row.id)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="danger"
            v-if="isDelete"
            @click="deleteData(slotProps.row.id)"
            >删除</el-button
          >
        </template>
        <template #headerHandle>
          <el-button
            type="primary"
            size="small"
            v-if="isCreate"
            @click="showAddUserDialog"
            >新建用户</el-button
          >
        </template>
      </cx-table>
    </div>
    <add-user-dialog
      ref="addUserDialogRef"
      v-model="addFormData"
      @handleAddUser="handleAddUser"
      :departmentList="departmentList"
      :roleList="roleList"
    />
    <edit-user-dialog
      ref="editUserDialogRef"
      v-model="editFormData"
      :departmentList="departmentList"
      :roleList="roleList"
      @handleEditUser="handleEditUser"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import { useStore } from '@/store'

import { searchConfig, tableConfig } from './config'

import CxHigherSearch from '@/base-ui/cx-higher-search/CxHigherSearch.vue'
import CxTable from '@/base-ui/cx-table/CxTable.vue'
import addUserDialog from './components/AddUserDialog.vue'
import editUserDialog from './components/EditUserDialog.vue'

import useQueryList from '@/hooks/useQueryList'
import useQueryPermissions from '@/hooks/useQueryPermissions'
import useAddUser from './hooks/useAddUser'
import useEditUser from './hooks/useEditUser'

export default defineComponent({
  name: 'User',
  components: {
    CxHigherSearch,
    CxTable,
    addUserDialog,
    editUserDialog
  },
  setup() {
    // 获取操作的权限
    const isCreate = useQueryPermissions('users', 'create')
    const isUpdate = useQueryPermissions('users', 'update')
    const isDelete = useQueryPermissions('users', 'delete')
    const isQuery = useQueryPermissions('users', 'query')
    const formData = ref({
      name: '',
      realname: '',
      cellphone: '',
      enable: '',
      createAt: ''
    })
    const {
      resetSearchFrom,
      searchList,
      sizeChange,
      currentChange,
      queryInfo,
      cxSearchRef,
      queryList,
      deleteData
    } = useQueryList(formData, 'users', isQuery)
    const {
      addUserDialogRef,
      showAddUserDialog,
      addFormData,
      handleAddUser,
      departmentList,
      roleList
    } = useAddUser(formData, 'users', isQuery)
    const {
      editUserDialogRef,
      showEditUserDialog,
      editFormData,
      editId,
      handleEditUser
    } = useEditUser(formData, 'users', isQuery)
    const store = useStore()

    queryList()
    const userList = computed(() => store.state.systemModule.userList)
    const userCount = computed(() => store.state.systemModule.userCount)

    // 选择框改变时
    const selectionChange = (selection: any) => {
      console.log(selection)
    }

    return {
      formData,
      userList,
      userCount,
      selectionChange,
      searchConfig,
      tableConfig,
      resetSearchFrom,
      cxSearchRef,
      searchList,
      queryInfo,
      sizeChange,
      currentChange,
      isCreate,
      isUpdate,
      isDelete,
      deleteData,
      addUserDialogRef,
      showAddUserDialog,
      addFormData,
      handleAddUser,
      departmentList,
      roleList,
      editUserDialogRef,
      showEditUserDialog,
      editFormData,
      editId,
      handleEditUser
    }
  }
})
</script>

<style lang="less" scoped>
.user {
  .content {
    padding: 0 15px;
    border-top: 15px solid #f5f5f5;
    /deep/ .footer {
      margin-top: 10px;
    }
  }
}
</style>

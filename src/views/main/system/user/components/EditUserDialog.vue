<template>
  <div class="add-user-dialog">
    <el-dialog title="修改用户" v-model="editUserDialogVisible">
      <el-form
        :model="editFormData"
        :label-width="100"
        :rules="rules"
        ref="editFormRef"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="editFormData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input
            v-model="editFormData.realname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="cellphone">
          <el-input
            v-model="editFormData.cellphone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择部门">
          <el-select
            v-model="editFormData.departmentId"
            placeholder="请选择部门"
          >
            <template v-for="item in departmentList" :key="item.id">
              <el-option :label="item.name" :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择角色">
          <el-select v-model="editFormData.roleId" placeholder="请选择角色">
            <template v-for="item in roleList" :key="item.id">
              <el-option :label="item.name" :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editUserDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUser">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import { ElForm } from 'element-plus'

import { rules } from './config'

export default defineComponent({
  emits: ['handleEditUser'],
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    },
    departmentList: {
      type: Array,
      default: () => []
    },
    roleList: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const editUserDialogVisible = ref(false)
    const editFormData = computed(() => props.modelValue)
    const editUser = () => {
      editFormRef.value?.validate((valid) => {
        if (valid) {
          emit('handleEditUser')
        }
      })
    }
    const editFormRef = ref<InstanceType<typeof ElForm>>()
    return {
      editUserDialogVisible,
      editFormData,
      editFormRef,
      rules,
      editUser
    }
  }
})
</script>

<style scoped></style>

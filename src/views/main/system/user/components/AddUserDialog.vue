<template>
  <div class="add-user-dialog">
    <el-dialog title="添加用户" v-model="addUserDialogVisible">
      <el-form
        :model="addFormData"
        :label-width="100"
        :rules="rules"
        ref="addFormRef"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="addFormData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input
            v-model="addFormData.realname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input
            v-model="addFormData.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="cellphone">
          <el-input
            v-model="addFormData.cellphone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择部门">
          <el-select
            v-model="addFormData.departmentId"
            placeholder="请选择部门"
          >
            <template v-for="item in departmentList" :key="item.id">
              <el-option :label="item.name" :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择角色">
          <el-select v-model="addFormData.roleId" placeholder="请选择角色">
            <template v-for="item in roleList" :key="item.id">
              <el-option :label="item.name" :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addUserDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

import { ElForm } from 'element-plus'

import { rules } from './config'

export default defineComponent({
  emits: ['update:modelValue', 'handleAddUser'],
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
    const addUserDialogVisible = ref(false)
    const addFormData = ref({ ...props.modelValue })
    const addFormRef = ref<InstanceType<typeof ElForm>>()
    watch(
      addFormData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      {
        deep: true
      }
    )
    const addUser = () => {
      addFormRef.value?.validate((valid) => {
        if (valid) {
          emit('handleAddUser')
        }
      })
    }
    const resetForm = () => {
      addFormData.value = {}
    }
    return {
      addUserDialogVisible,
      addFormData,
      addUser,
      rules,
      addFormRef,
      resetForm
    }
  }
})
</script>

<style scoped></style>

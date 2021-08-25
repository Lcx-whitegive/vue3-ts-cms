import { ElMessage } from 'element-plus'

import { ref, computed } from 'vue'

import { useStore } from '@/store'

import addUserDialog from '../components/AddUserDialog.vue'

import useQueryList from '@/hooks/useQueryList'

export default function useAddUser(
  formData: any,
  pageName: string,
  isQuery: boolean
) {
  const { queryInfo, queryList } = useQueryList(formData, pageName, isQuery)
  const store = useStore()
  const addUserDialogRef = ref<InstanceType<typeof addUserDialog>>()
  const addFormData = ref({
    name: '',
    realname: '',
    password: '',
    cellphone: '',
    departmentId: '',
    roleId: ''
  })
  const showAddUserDialog = () => {
    if (addUserDialogRef.value) {
      addUserDialogRef.value.addUserDialogVisible = true
    }
  }
  store.dispatch({
    type: 'systemModule/getPageList',
    pageName: 'department',
    queryInfo: {
      offset: 0,
      size: 1000
    }
  })
  store.dispatch({
    type: 'systemModule/getPageList',
    pageName: 'role',
    queryInfo: {
      offset: 0,
      size: 1000
    }
  })
  const departmentList = computed(() => store.state.systemModule.departmentList)
  const roleList = computed(() => store.state.systemModule.roleList)
  const handleAddUser = () => {
    console.log(addFormData.value)
    store
      .dispatch({
        type: 'systemModule/addPageData',
        pageName: 'users',
        info: addFormData.value
      })
      .then((res) => {
        ElMessage({
          type: 'success',
          message: res
        })
      })
      .catch((err) => {
        ElMessage({
          type: 'error',
          message: err
        })
      })
    if (addUserDialogRef.value) {
      addUserDialogRef.value.addUserDialogVisible = false
      addUserDialogRef.value.resetForm()
    }
    queryInfo.offset = 0
    queryList()
  }

  return {
    addUserDialogRef,
    addFormData,
    showAddUserDialog,
    departmentList,
    roleList,
    handleAddUser
  }
}

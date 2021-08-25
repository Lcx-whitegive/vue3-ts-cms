import { ref } from 'vue'

import editUserDialog from '../components/EditUserDialog.vue'

import { useStore } from '@/store'

import { ElMessage } from 'element-plus'

import useQueryList from '@/hooks/useQueryList'

export default function useEditUser(
  formData: any,
  pageName: string,
  isQuery: boolean
) {
  const { queryInfo, queryList } = useQueryList(formData, pageName, isQuery)
  const store = useStore()
  const editFormData = ref({
    name: '',
    realname: '',
    cellphone: '',
    departmentId: '',
    roleId: ''
  })
  const editId = ref()
  const editUserDialogRef = ref<InstanceType<typeof editUserDialog>>()
  const showEditUserDialog = (info: any, id: number) => {
    if (editUserDialogRef.value) {
      editUserDialogRef.value.editUserDialogVisible = true
    }
    editFormData.value = info
    editId.value = id
  }
  const handleEditUser = () => {
    console.log(editFormData.value)
    store
      .dispatch({
        type: 'systemModule/editPageDataAction',
        pageName: 'users',
        info: {
          name: editFormData.value.name,
          realname: editFormData.value.realname,
          cellphone: editFormData.value.cellphone,
          departmentId: editFormData.value.departmentId,
          roleId: editFormData.value.roleId
        },
        id: editId.value
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
    if (editUserDialogRef.value) {
      editUserDialogRef.value.editUserDialogVisible = false
    }
    queryInfo.offset = 0
    queryList()
  }

  return {
    editUserDialogRef,
    showEditUserDialog,
    handleEditUser,
    editFormData,
    editId
  }
}

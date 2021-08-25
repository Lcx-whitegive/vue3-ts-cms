import { ref } from 'vue'

import { useStore } from '@/store'

import CxHigherSearch from '@/base-ui/cx-higher-search/CxHigherSearch.vue'

import { ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus'

export default function useQueryLisy(
  formData: any,
  pageName: string,
  isQuery: boolean
) {
  const queryInfo = {
    offset: 0,
    size: 3
  }
  const store = useStore()
  const queryList = () => {
    if (!isQuery) return
    store.dispatch({
      type: 'systemModule/getPageList',
      pageName,
      queryInfo: {
        ...queryInfo,
        ...formData.value
      }
    })
  }
  // 重置表单
  const cxSearchRef = ref<InstanceType<typeof CxHigherSearch>>()
  const resetSearchFrom = () => {
    cxSearchRef.value?.resetForm()
    queryInfo.offset = 0
    queryList()
  }
  // 条件查询
  const searchList = () => {
    queryInfo.offset = 0
    queryList()
  }
  // 每页显示条数变化
  const sizeChange = (pageSize: number) => {
    queryInfo.size = pageSize
    queryInfo.offset = 0
    queryList()
  }
  // 页码变化
  const currentChange = (pageNum: number) => {
    queryInfo.offset = (pageNum - 1) * queryInfo.size
    queryList()
  }
  // 删除数据
  const deleteData = (id: number) => {
    ElMessageBox.confirm('此操作将永久删除该用户, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        store
          .dispatch({
            type: 'systemModule/deletePageDataAction',
            pageName,
            id
          })
          .then((res) => {
            ElMessage({
              type: 'success',
              message: res
            })
            queryInfo.offset = 0
            queryList()
          })
          .catch((err) => {
            ElMessage({
              type: 'error',
              message: err
            })
          })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消删除'
        })
      })
  }
  return {
    resetSearchFrom,
    searchList,
    sizeChange,
    currentChange,
    queryInfo,
    cxSearchRef,
    queryList,
    deleteData
  }
}

import { ISearchItem } from '@/base-ui/cx-higher-search/types'

const searchItems: ISearchItem[] = [
  {
    field: 'name',
    type: 'input',
    label: '用户名',
    placeholder: '请输入用户名'
  },
  {
    field: 'realname',
    type: 'password',
    label: '真实姓名',
    placeholder: '请输入真实姓名'
  },
  {
    field: 'cellphone',
    type: 'password',
    label: '电话号码',
    placeholder: '请输入电话号码'
  },
  {
    field: 'enable',
    type: 'select',
    label: '用户状态',
    placeholder: '请选择用户状态',
    options: [
      {
        label: '启用',
        value: 1
      },
      {
        label: '禁用',
        value: 0
      }
    ]
  },
  {
    field: 'createAt',
    type: 'datePicker',
    label: '创建时间',
    otherOptions: {
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      type: 'daterange'
    }
  }
]
const labelWidth = '110px'
const itemStyle = {
  padding: '0 2px'
}
const colLayout = {
  xl: 6,
  lg: 8,
  md: 12,
  sm: 24,
  xs: 24
}
const propList = [
  { prop: 'name', label: '用户名', minWidth: '70' },
  { prop: 'realname', label: '真实姓名', minWidth: '80' },
  { prop: 'cellphone', label: '手机号码', minWidth: '115' },
  { prop: 'enable', label: '状态', minWidth: '80', slotName: 'status' },
  {
    prop: 'createAt',
    label: '创建时间',
    minWidth: '200',
    slotName: 'createAt'
  },
  {
    prop: 'updateAt',
    label: '更新时间',
    minWidth: '170',
    slotName: 'updateAt'
  },
  {
    label: '操作',
    minWidth: '170',
    slotName: 'operation'
  }
]

export const searchConfig = {
  searchItems,
  labelWidth,
  itemStyle,
  colLayout
}
const height = 200
const showIndex = true
const showSelection = true
const title = '用户列表'
export const tableConfig = {
  propList,
  height,
  showIndex,
  showSelection,
  title
}

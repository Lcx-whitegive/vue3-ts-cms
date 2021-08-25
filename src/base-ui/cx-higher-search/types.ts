type ItemType = 'input' | 'password' | 'select' | 'datePicker'

export interface ISearchItem {
  field: string
  type: ItemType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select的配置
  options?: any[]
  // 其他特殊配置
  otherOptions?: any
}

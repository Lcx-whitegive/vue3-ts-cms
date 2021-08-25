const propList = [
  { prop: 'name', label: '商品名称', minWidth: '80' },
  { prop: 'oldPrice', label: '原价格', minWidth: '60', slotName: 'oldPrice' },
  { prop: 'newPrice', label: '现价格', minWidth: '60' },
  { prop: 'imgUrl', label: '商品图片', minWidth: '80', slotName: 'image' },
  { prop: 'status', label: '状态', minWidth: '80', slotName: 'status' },
  {
    prop: 'createAt',
    label: '创建时间',
    minWidth: '180',
    slotName: 'createAt'
  },
  {
    prop: 'updateAt',
    label: '更新时间',
    minWidth: '180',
    slotName: 'updateAt'
  },
  { label: '操作', minWidth: '170', slotName: 'operation' }
]
const height = 350
const showIndex = true
const showSelection = true
const title = '商品列表'
export const tableConfig = {
  propList,
  height,
  showIndex,
  showSelection,
  title
}

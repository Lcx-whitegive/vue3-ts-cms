import { App } from 'vue'
import {
  ElButton,
  ElForm,
  ElTabs,
  ElTabPane,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink
} from 'element-plus'
import 'element-plus/lib/theme-chalk/base.css'

const components = [
  ElButton,
  ElForm,
  ElTabs,
  ElTabPane,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink
]

export default function registerElements(app: App): void {
  components.forEach((c) => {
    app.component(c.name, c)
  })
}

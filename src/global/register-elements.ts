import { App } from 'vue'
import { ElButton, ElForm } from 'element-plus'
import 'element-plus/lib/theme-chalk/base.css'

const components = [ElButton, ElForm]

export default function registerElements(app: App): void {
  components.forEach((c) => {
    app.component(c.name, c)
  })
}

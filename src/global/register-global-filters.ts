import { App } from 'vue'

import fromatTimeFilter from '@/utils/formatTime'

export default function registerGlobalFilters(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(time: string, style: string) {
      return fromatTimeFilter(time, style)
    }
  }
}

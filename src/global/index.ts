import { App } from 'vue'

import registerElements from './register-elements'
import registerGlobalFilters from './register-global-filters'

export default function globalRegister(app: App): void {
  app.use(registerElements)
  app.use(registerGlobalFilters)
}

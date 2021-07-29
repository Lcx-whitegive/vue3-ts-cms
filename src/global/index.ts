import { App } from 'vue'

import registerElements from './register-elements'

export default function globalRegister(app: App): void {
  app.use(registerElements)
}

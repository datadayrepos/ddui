import type { App } from 'vue'
import { Loading } from './src/service'
import { vLoading } from './src/directive'

// installer and everything in all
export const ElLoading = {
  directive: vLoading,
  install(app: App) {
    app.directive('loading', vLoading)
    app.config.globalProperties.$loading = Loading
  },
  service: Loading,
}

export default ElLoading
export { vLoading, vLoading as ElLoadingDirective, Loading as ElLoadingService }

export * from './src/types'

/**
 * Created by Ivar Strand Dec on 2021.12.19 11.43
 */

import type { App } from 'vue'

import AbyElButton from '../components/button'
import AbyElForm, { ElFormItem } from '../components/form'
import AbyElPopover from '../components/popover'

// register components
export function registerComponents_el(app: App): void {
  app.component('AbyElButton', AbyElButton)
    .component('aby-el-form', AbyElForm)
    .component('aby-el-form-item', ElFormItem)
    .component('aby-el-popover', AbyElPopover)
}

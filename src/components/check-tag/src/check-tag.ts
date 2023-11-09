import { buildProps, isBoolean } from '/@/utils'
import { CHANGE_EVENT } from '/@/constants'

import type CheckTag from './check-tag.vue'
import type { ExtractPropTypes } from 'vue'

export const checkTagProps = buildProps({
  /**
   * @description is checked
   */
  checked: {
    default: false,
    type: Boolean,
  },
} as const)
export type CheckTagProps = ExtractPropTypes<typeof checkTagProps>

export const checkTagEmits = {
  [CHANGE_EVENT]: (value: boolean) => isBoolean(value),
  'update:checked': (value: boolean) => isBoolean(value),
}
export type CheckTagEmits = typeof checkTagEmits

export type CheckTagInstance = InstanceType<typeof CheckTag>

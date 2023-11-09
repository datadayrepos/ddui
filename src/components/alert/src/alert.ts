import { TypeComponentsMap, buildProps, keysOf } from '/@/utils'
import type { ExtractPropTypes } from 'vue'

export const alertEffects = ['light', 'dark'] as const

export const alertProps = buildProps({
  /**
   * @description should content be placed in center.
   */
  center: Boolean,
  /**
   * @description whether alert can be dismissed.
   */
  closable: {
    default: true,
    type: Boolean,
  },
  /**
   * @description text for replacing x button
   */
  closeText: {
    default: '',
    type: String,
  },
  description: {
    default: '',
    type: String,
  },
  effect: {
    default: 'light',
    type: String,
    values: alertEffects,
  },
  /**
   * @description whether show icon
   */
  showIcon: Boolean,
  /**
   * @description alert title.
   */
  title: {
    default: '',
    type: String,
  },
  /**
   * @description alert type.
   */
  type: {
    default: 'info',
    type: String,
    values: keysOf(TypeComponentsMap),
  },
} as const)
export type AlertProps = ExtractPropTypes<typeof alertProps>

export const alertEmits = {
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
}
export type AlertEmits = typeof alertEmits

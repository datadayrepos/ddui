import { buildProps } from '/@/utils'
import { componentSizes } from '/@/constants'
import type Tag from './tag.vue'

import type { ExtractPropTypes } from 'vue'

export const tagProps = buildProps({
  /**
   * @description whether Tag can be removed
   */
  closable: Boolean,
  /**
   * @description background color of the Tag
   */
  color: {
    default: '',
    type: String,
  },
  /**
   * @description whether to disable animations
   */
  disableTransitions: Boolean,
  /**
   * @description theme of Tag
   */
  effect: {
    default: 'light',
    type: String,
    values: ['dark', 'light', 'plain'],
  },
  /**
   * @description whether Tag has a highlighted border
   */
  hit: Boolean,
  /**
   * @description whether Tag is rounded
   */
  round: Boolean,
  /**
   * @description size of Tag
   */
  size: {
    default: '',
    type: String,
    values: componentSizes,
  },
  /**
   * @description type of Tag
   */
  type: {
    default: '',
    type: String,
    values: ['success', 'info', 'warning', 'danger', ''],
  },
} as const)
export type TagProps = ExtractPropTypes<typeof tagProps>

export const tagEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
}
export type TagEmits = typeof tagEmits

export type TagInstance = InstanceType<typeof Tag>

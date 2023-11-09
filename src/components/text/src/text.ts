import { buildProps } from '/@/utils'
import { componentSizes } from '/@/constants'

import type { ExtractPropTypes } from 'vue'

export const textProps = buildProps({
  /**
   * @description maximum lines
   */
  lineClamp: {
    type: [String, Number],
  },
  /**
   * @description text size
   */
  size: {
    default: '',
    type: String,
    values: componentSizes,
  },
  /**
   * @description custom element tag
   */
  tag: {
    default: 'span',
    type: String,
  },
  /**
   * @description render ellipsis
   */
  truncated: {
    type: Boolean,
  },
  /**
   * @description text type
   */
  type: {
    default: '',
    type: String,
    values: ['primary', 'success', 'info', 'warning', 'danger', ''],
  },
} as const)

export type TextProps = ExtractPropTypes<typeof textProps>

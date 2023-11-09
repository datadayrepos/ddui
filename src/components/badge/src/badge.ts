import { buildProps } from '/@/utils'
import type { ExtractPropTypes } from 'vue'

export const badgeProps = buildProps({
  /**
   * @description hidden badge.
   */
  hidden: Boolean,
  /**
   * @description if a little dot is displayed.
   */
  isDot: Boolean,
  /**
   * @description maximum value, shows `{max}+` when exceeded. Only works if value is a number.
   */
  max: {
    default: 99,
    type: Number,
  },
  /**
   * @description badge type.
   */
  type: {
    default: 'danger',
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'danger'],
  },
  /**
   * @description display value.
   */
  value: {
    default: '',
    type: [String, Number],
  },
} as const)
export type BadgeProps = ExtractPropTypes<typeof badgeProps>

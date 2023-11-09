import { buildProps, definePropType, isNumber } from '/@/utils'
import { CHANGE_EVENT } from '/@/constants'

import type { ExtractPropTypes, StyleValue } from 'vue'
import type { Dayjs } from 'dayjs'
import type Countdown from './countdown.vue'

export const countdownProps = buildProps({
  /**
   * @description Formatting the countdown display
   */
  format: {
    default: 'HH:mm:ss',
    type: String,
  },
  /**
   * @description Sets the prefix of a countdown
   */
  prefix: String,
  /**
   * @description Sets the suffix of a countdown
   */
  suffix: String,
  /**
   * @description countdown titles
   */
  title: String,
  /**
   * @description target time
   */
  value: {
    default: 0,
    type: definePropType<number | Dayjs>([Number, Object]),
  },
  /**
   * @description Styles countdown values
   */
  valueStyle: {
    type: definePropType<StyleValue>([String, Object, Array]),
  },
} as const)
export type CountdownProps = ExtractPropTypes<typeof countdownProps>

export const countdownEmits = {
  [CHANGE_EVENT]: (value: number) => isNumber(value),
  finish: () => true,
}
export type CountdownEmits = typeof countdownEmits

export type CountdownInstance = InstanceType<typeof Countdown>

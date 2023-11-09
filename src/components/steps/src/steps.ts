import { CHANGE_EVENT } from '/@/constants'
import { buildProps, isNumber } from '/@/utils'
import type Steps from './steps.vue'
import type { ExtractPropTypes } from 'vue'

export const stepsProps = buildProps({
  /**
   * @description current activation step
   */
  active: {
    default: 0,
    type: Number,
  },
  /**
   * @description center title and description
   */
  alignCenter: {
    type: Boolean,
  },
  /**
   * @description display direction
   */
  direction: {
    default: 'horizontal',
    type: String,
    values: ['horizontal', 'vertical'],
  },
  /**
   * @description status of end step
   */
  finishStatus: {
    default: 'finish',
    type: String,
    values: ['wait', 'process', 'finish', 'error', 'success'],
  },
  /**
   * @description status of current step
   */
  processStatus: {
    default: 'process',
    type: String,
    values: ['wait', 'process', 'finish', 'error', 'success'],
  },
  /**
   * @description whether to apply simple theme
   */
  simple: {
    type: Boolean,
  },
  /**
   * @description the spacing of each step, will be responsive if omitted. Supports percentage.
   */
  space: {
    default: '',
    type: [Number, String],
  },
} as const)
export type StepsProps = ExtractPropTypes<typeof stepsProps>

export const stepsEmits = {
  [CHANGE_EVENT]: (newVal: number, oldVal: number) => [newVal, oldVal].every(isNumber),
}
export type StepsEmits = typeof stepsEmits

export type StepsInstance = InstanceType<typeof Steps>

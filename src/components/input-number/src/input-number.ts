import { isNil } from '@datadayrepos/lodashts'
import { useSizeProp } from '/@/hooks'
import { buildProps, isNumber } from '/@/utils'
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '/@/constants'
import type { ExtractPropTypes } from 'vue'
import type InputNumber from './input-number.vue'

export const inputNumberProps = buildProps({
  /**
   * @description whether to enable the control buttons
   */
  controls: {
    default: true,
    type: Boolean,
  },
  /**
   * @description position of the control buttons
   */
  controlsPosition: {
    default: '',
    type: String,
    values: ['', 'right'],
  },
  /**
   * @description whether the component is disabled
   */
  disabled: Boolean,
  /**
   * @description same as `id` in native input
   */
  id: {
    default: undefined,
    type: String,
  },
  /**
   * @description same as `label` in native input
   */
  label: String,
  /**
   * @description the maximum allowed value
   */
  max: {
    default: Number.POSITIVE_INFINITY,
    type: Number,
  },
  /**
   * @description the minimum allowed value
   */
  min: {
    default: Number.NEGATIVE_INFINITY,
    type: Number,
  },
  /**
   * @description binding value
   */
  modelValue: Number,
  /**
   * @description same as `name` in native input
   */
  name: String,
  /**
   * @description same as `placeholder` in native input
   */
  placeholder: String,
  /**
   * @description precision of input value
   */
  precision: {
    type: Number,
    validator: (val: number) =>
      val >= 0 && val === Number.parseInt(`${val}`, 10),
  },
  /**
   * @description same as `readonly` in native input
   */
  readonly: Boolean,
  /**
   * @description size of the component
   */
  size: useSizeProp,
  /**
   * @description incremental step
   */
  step: {
    default: 1,
    type: Number,
  },
  /**
   * @description whether input value can only be multiple of step
   */
  stepStrictly: Boolean,
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    default: true,
    type: Boolean,
  },
  /**
   * @description value should be set when input box is cleared
   */
  valueOnClear: {
    default: null,
    type: [String, Number, null],
    validator: (val: 'min' | 'max' | number | null) =>
      val === null || isNumber(val) || ['min', 'max'].includes(val),
  },
} as const)
export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>

export const inputNumberEmits = {
  [CHANGE_EVENT]: (cur: number | undefined, prev: number | undefined) => prev !== cur,
  [INPUT_EVENT]: (val: number | null | undefined) =>
    isNumber(val) || isNil(val),
  [UPDATE_MODEL_EVENT]: (val: number | undefined) =>
    isNumber(val) || isNil(val),
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  focus: (e: FocusEvent) => e instanceof FocusEvent,
}
export type InputNumberEmits = typeof inputNumberEmits

export type InputNumberInstance = InstanceType<typeof InputNumber>

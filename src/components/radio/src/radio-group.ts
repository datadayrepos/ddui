import { buildProps } from '/@/utils'
import { useSizeProp } from '/@/hooks'
import { radioEmits } from './radio'
import type { ExtractPropTypes } from '@vue/runtime-core'
import type RadioGroup from './radio-group.vue'

export const radioGroupProps = buildProps({
  /**
   * @description whether the nesting radios are disabled
   */
  disabled: Boolean,
  /**
   * @description border and background color when button is active
   */
  fill: {
    default: '',
    type: String,
  },
  /**
   * @description native `id` attribute
   */
  id: {
    default: undefined,
    type: String,
  },
  /**
   * @description same as `aria-label` in RadioGroup
   */
  label: {
    default: undefined,
    type: String,
  },
  /**
   * @description binding value
   */
  modelValue: {
    default: '',
    type: [String, Number, Boolean],
  },
  /**
   * @description native `name` attribute
   */
  name: {
    default: undefined,
    type: String,
  },
  /**
   * @description the size of radio buttons or bordered radios
   */
  size: useSizeProp,
  /**
   * @description font color when button is active
   */
  textColor: {
    default: '',
    type: String,
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    default: true,
    type: Boolean,
  },
} as const)
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export const radioGroupEmits = radioEmits
export type RadioGroupEmits = typeof radioGroupEmits
export type RadioGroupInstance = InstanceType<typeof RadioGroup>

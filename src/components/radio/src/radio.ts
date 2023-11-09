import { buildProps, isBoolean, isNumber, isString } from '/@/utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '/@/constants'
import { useSizeProp } from '/@/hooks'
import type { ExtractPropTypes } from 'vue'
import type Radio from './radio.vue'

export const radioPropsBase = buildProps({
  /**
   * @description whether Radio is disabled
   */
  disabled: Boolean,
  /**
   * @description the value of Radio
   */
  label: {
    default: '',
    type: [String, Number, Boolean],
  },
  /**
   * @description size of the Radio
   */
  size: useSizeProp,
})

export const radioProps = buildProps({
  ...radioPropsBase,
  /**
   * @description whether to add a border around Radio
   */
  border: Boolean,
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
    default: '',
    type: String,
  },
} as const)

export const radioEmits = {
  [CHANGE_EVENT]: (val: string | number | boolean) =>
    isString(val) || isNumber(val) || isBoolean(val),
  [UPDATE_MODEL_EVENT]: (val: string | number | boolean) =>
    isString(val) || isNumber(val) || isBoolean(val),
}

export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioEmits = typeof radioEmits
export type RadioInstance = InstanceType<typeof Radio>

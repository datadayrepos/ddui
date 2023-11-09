import { UPDATE_MODEL_EVENT } from '/@/constants'
import { useSizeProp } from '/@/hooks'
import { buildProps, definePropType, isArray } from '/@/utils'

import type { ExtractPropTypes } from 'vue'
import type checkboxGroup from './checkbox-group.vue'
import type { CheckboxValueType } from './checkbox'

export type CheckboxGroupValueType = Exclude<CheckboxValueType, boolean>[]

export const checkboxGroupProps = buildProps({
  /**
   * @description whether the nesting checkboxes are disabled
   */
  disabled: Boolean,
  /**
   * @description border and background color when button is active
   */
  fill: String,
  /**
   * @description label for screen reader
   */
  label: String,
  /**
   * @description maximum number of checkbox checked
   */
  max: Number,
  /**
   * @description minimum number of checkbox checked
   */
  min: Number,
  /**
   * @description binding value
   */
  modelValue: {
    default: () => [],
    type: definePropType<CheckboxGroupValueType>(Array),
  },
  /**
   * @description size of checkbox
   */
  size: useSizeProp,
  /**
   * @description element tag of the checkbox group
   */
  tag: {
    default: 'div',
    type: String,
  },
  /**
   * @description font color when button is active
   */
  textColor: String,
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    default: true,
    type: Boolean,
  },
} as const)

export const checkboxGroupEmits = {
  [UPDATE_MODEL_EVENT]: (val: CheckboxGroupValueType) => isArray(val),
  change: (val: CheckboxValueType[]) => isArray(val),
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupEmits = typeof checkboxGroupEmits
export type CheckboxGroupInstance = InstanceType<typeof checkboxGroup>

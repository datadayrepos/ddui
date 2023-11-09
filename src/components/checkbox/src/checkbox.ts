import { UPDATE_MODEL_EVENT } from '/@/constants'
import { useSizeProp } from '/@/hooks'
import { isBoolean, isNumber, isString } from '/@/utils'

import type { ExtractPropTypes } from 'vue'
import type Checkbox from './checkbox.vue'

export type CheckboxValueType = string | number | boolean

export const checkboxProps = {
  /**
   * @description whether to add a border around Checkbox
   */
  border: Boolean,
  /**
   * @description if the Checkbox is checked
   */
  checked: Boolean,
  /**
   * @description same as [aria-controls](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls), takes effect when `indeterminate` is `true`
   */
  controls: {
    default: undefined,
    type: String,
  },
  /**
   * @description whether the Checkbox is disabled
   */
  disabled: Boolean,
  /**
   * @description value of the Checkbox if it's not checked
   */
  falseLabel: {
    default: undefined,
    type: [String, Number],
  },
  /**
   * @description input id
   */
  id: {
    default: undefined,
    type: String,
  },
  /**
   * @description Set indeterminate state, only responsible for style control
   */
  indeterminate: Boolean,
  /**
   * @description value of the Checkbox when used inside a `checkbox-group`
   */
  label: {
    default: undefined,
    type: [String, Boolean, Number, Object],
  },
  /**
   * @description binding value
   */
  modelValue: {
    default: undefined,
    type: [Number, String, Boolean],
  },
  /**
   * @description native 'name' attribute
   */
  name: {
    default: undefined,
    type: String,
  },
  /**
   * @description size of the Checkbox
   */
  size: useSizeProp,
  /**
   * @description input tabindex
   */
  tabindex: [String, Number],
  /**
   * @description value of the Checkbox if it's checked
   */
  trueLabel: {
    default: undefined,
    type: [String, Number],
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    default: true,
    type: Boolean,
  },
}

export const checkboxEmits = {
  [UPDATE_MODEL_EVENT]: (val: CheckboxValueType) =>
    isString(val) || isNumber(val) || isBoolean(val),
  change: (val: CheckboxValueType) =>
    isString(val) || isNumber(val) || isBoolean(val),
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
export type CheckboxEmits = typeof checkboxEmits
export type CheckboxInstance = InstanceType<typeof Checkbox>

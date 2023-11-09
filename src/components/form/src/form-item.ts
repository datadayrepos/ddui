import { componentSizes } from '/@/constants'
import { buildProps, definePropType } from '/@/utils'

import type { ExtractPropTypes } from 'vue'
import type { Arrayable } from '/@/utils'
import type { FormItemRule } from './types'

export const formItemValidateStates = [
  '',
  'error',
  'validating',
  'success',
] as const
export type FormItemValidateState = typeof formItemValidateStates[number]

export type FormItemProp = Arrayable<string>

export const formItemProps = buildProps({
  /**
   * @description Field error message, set its value and the field will validate error and show this message immediately.
   */
  error: String,
  /**
   * @description Same as for in native label.
   */
  for: String,
  /**
   * @description Inline style validate message.
   */
  inlineMessage: {
    default: '',
    type: [String, Boolean],
  },
  /**
   * @description Label text.
   */
  label: String,
  /**
   * @description Width of label, e.g. `'50px'`. `'auto'` is supported.
   */
  labelWidth: {
    default: '',
    type: [String, Number],
  },
  /**
   * @description  A key of `model`. It could be an array of property paths (e.g `['a', 'b', '0']`). In the use of `validate` and `resetFields` method, the attribute is required.
   */
  prop: {
    type: definePropType<FormItemProp>([String, Array]),
  },
  /**
   * @description Whether the field is required or not, will be determined by validation rules if omitted.
   */
  required: {
    default: undefined,
    type: Boolean,
  },
  /**
   * @description Validation rules of form, see the [following table](#formitemrule), more advanced usage at [async-validator](https://github.com/yiminghe/async-validator).
   */
  rules: {
    type: definePropType<Arrayable<FormItemRule>>([Object, Array]),
  },
  /**
   * @description Whether to show the error message.
   */
  showMessage: {
    default: true,
    type: Boolean,
  },
  /**
   * @description Control the size of components in this form-item.
   */
  size: {
    type: String,
    values: componentSizes,
  },
  /**
   * @description Validation state of formItem.
   */
  validateStatus: {
    type: String,
    values: formItemValidateStates,
  },
} as const)
export type FormItemProps = ExtractPropTypes<typeof formItemProps>

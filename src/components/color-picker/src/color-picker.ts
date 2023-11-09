import { isNil } from '@datadayrepos/lodashts'
import { buildProps, definePropType, isString } from '/@/utils'
import { useSizeProp } from '/@/hooks'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '/@/constants'

import type { ComputedRef, ExtractPropTypes, InjectionKey } from 'vue'
import type ColorPicker from './color-picker.vue'

export const colorPickerProps = buildProps({
  /**
   * @description color format of v-model
   */
  colorFormat: String,
  /**
   * @description whether to disable the ColorPicker
   */
  disabled: Boolean,
  /**
   * @description ColorPicker id
   */
  id: String,
  /**
   * @description ColorPicker aria-label
   */
  label: {
    default: undefined,
    type: String,
  },
  /**
   * @description binding value
   */
  modelValue: String,
  /**
   * @description custom class name for ColorPicker's dropdown
   */
  popperClass: {
    default: '',
    type: String,
  },
  /**
   * @description predefined color options
   */
  predefine: {
    type: definePropType<string[]>(Array),
  },
  /**
   * @description whether to display the alpha slider
   */
  showAlpha: Boolean,
  /**
   * @description size of ColorPicker
   */
  size: useSizeProp,
  /**
   * @description ColorPicker tabindex
   */
  tabindex: {
    default: 0,
    type: [String, Number],
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    default: true,
    type: Boolean,
  },
} as const)
export const colorPickerEmits = {
  [CHANGE_EVENT]: (val: string | null) => isString(val) || isNil(val),
  [UPDATE_MODEL_EVENT]: (val: string | null) => isString(val) || isNil(val),
  activeChange: (val: string | null) => isString(val) || isNil(val),
  blur: (event: FocusEvent) => event instanceof FocusEvent,
  focus: (event: FocusEvent) => event instanceof FocusEvent,
}

export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>
export type ColorPickerEmits = typeof colorPickerEmits
export type ColorPickerInstance = InstanceType<typeof ColorPicker>

export interface ColorPickerContext {
  currentColor: ComputedRef<string>
}

export const colorPickerContextKey: InjectionKey<ColorPickerContext> = Symbol(
  'colorPickerContextKey',
)

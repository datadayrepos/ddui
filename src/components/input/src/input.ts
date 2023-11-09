import { isString } from '@vue/shared'
import {
  buildProps,
  definePropType,
  iconPropType,
  mutable,
} from '/@/utils'
import { UPDATE_MODEL_EVENT } from '/@/constants'
import { useSizeProp } from '/@/hooks'
import type { ExtractPropTypes, StyleValue } from 'vue'
import type Input from './input.vue'

export type InputAutoSize = { minRows?: number; maxRows?: number } | boolean

export const inputProps = buildProps({
  /**
   * @description native input autocomplete
   */
  autocomplete: {
    default: 'off',
    type: String,
  },
  /**
   * @description native input autofocus
   */
  autofocus: {
    default: false,
    type: Boolean,
  },
  /**
   * @description whether textarea has an adaptive height
   */
  autosize: {
    default: false,
    type: definePropType<InputAutoSize>([Boolean, Object]),
  },
  /**
   * @description native input readonly
   */
  clearable: {
    default: false,
    type: Boolean,
  },
  /**
   * @description container role, internal properties provided for use by the picker component
   */
  containerRole: {
    default: undefined,
    type: String,
  },
  /**
   * @description whether to disable
   */
  disabled: Boolean,
  /**
   * @description native input form
   */
  form: {
    type: String,
  },
  /**
   * @description format content
   */
  formatter: {
    type: Function,
  },
  /**
   * @description native input id
   */
  id: {
    default: undefined,
    type: String,
  },
  /**
   * @description input or textarea element style
   */
  inputStyle: {
    default: () => mutable({} as const),
    type: definePropType<StyleValue>([Object, Array, String]),
  },
  /**
   * @description native input aria-label
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
    type: definePropType<string | number | null | undefined>([
      String,
      Number,
      Object,
    ]),
  },
  /**
   * @description parse content
   */
  parser: {
    type: Function,
  },
  /**
   * @description placeholder
   */
  placeholder: {
    type: String,
  },
  /**
   * @description prefix icon
   */
  prefixIcon: {
    type: iconPropType,
  },
  /**
   * @description native input readonly
   */
  readonly: {
    default: false,
    type: Boolean,
  },
  /**
   * @description control the resizability
   */
  resize: {
    type: String,
    values: ['none', 'both', 'horizontal', 'vertical'],
  },
  /**
   * @description toggleable password input
   */
  showPassword: {
    default: false,
    type: Boolean,
  },
  /**
   * @description word count
   */
  showWordLimit: {
    default: false,
    type: Boolean,
  },
  /**
   * @description input box size
   */
  size: useSizeProp,
  /**
   * @description suffix icon
   */
  suffixIcon: {
    type: iconPropType,
  },
  /**
   * @description input tabindex
   */
  tabindex: {
    default: 0,
    type: [String, Number],
  },
  /**
   * @description type of input
   */
  type: {
    default: 'text',
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
export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  change: (value: string) => isString(value),
  clear: () => true,
  compositionend: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionstart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionupdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  input: (value: string) => isString(value),
  // NOTE: when autofill by browser, the keydown event is instanceof Event, not KeyboardEvent
  // relative bug report https://github.com/element-plus/element-plus/issues/6665
  keydown: (evt: KeyboardEvent | Event) => evt instanceof Event,
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
}
export type InputEmits = typeof inputEmits

export type InputInstance = InstanceType<typeof Input>

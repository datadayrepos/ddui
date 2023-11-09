import {
  buildProps,
  definePropType,
  iconPropType,
  isBoolean,
  isNumber,
  isString,
  isValidComponentSize,
} from '/@/utils'
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '/@/constants'
import type { ComponentSize } from '/@/constants'
import type Switch from './switch.vue'
import type { ExtractPropTypes, PropType } from 'vue'

export const switchProps = buildProps({
  /**
   * @description component of the icon displayed in action when in `on` state
   */
  activeActionIcon: {
    type: iconPropType,
  },
  /**
   * @deprecated background color when in `on` state ( deprecated, use CSS var `--el-switch-on-color` instead )
   */
  activeColor: {
    default: '',
    type: String,
  },
  /**
   * @description component of the icon displayed when in `on` state, overrides `active-text`
   */
  activeIcon: {
    type: iconPropType,
  },
  /**
   * @description text displayed when in `on` state
   */
  activeText: {
    default: '',
    type: String,
  },
  /**
   * @description switch value when in `on` state
   */
  activeValue: {
    default: true,
    type: [Boolean, String, Number],
  },
  /**
   * @description before-change hook before the switch state changes. If `false` is returned or a `Promise` is returned and then is rejected, will stop switching
   */
  beforeChange: {
    type: definePropType<() => Promise<boolean> | boolean>(Function),
  },
  /**
   * @deprecated border color of the switch ( deprecated, use CSS var `--el-switch-border-color` instead )
   */
  borderColor: {
    default: '',
    type: String,
  },
  /**
   * @description whether Switch is disabled
   */
  disabled: {
    default: false,
    type: Boolean,
  },
  /**
   * @description id for input
   */
  id: String,
  /**
   * @description component of the icon displayed in action when in `off` state
   */
  inactiveActionIcon: {
    type: iconPropType,
  },
  /**
   * @deprecated background color when in `off` state ( deprecated, use CSS var `--el-switch-off-color` instead )
   */
  inactiveColor: {
    default: '',
    type: String,
  },
  /**
   * @description component of the icon displayed when in `off` state, overrides `inactive-text`
   */
  inactiveIcon: {
    type: iconPropType,
  },
  /**
   * @description text displayed when in `off` state
   */
  inactiveText: {
    default: '',
    type: String,
  },
  /**
   * @description switch value when in `off` state
   */
  inactiveValue: {
    default: false,
    type: [Boolean, String, Number],
  },
  /**
   * @description whether icon or text is displayed inside dot, only the first character will be rendered for text
   */
  inlinePrompt: {
    default: false,
    type: Boolean,
  },
  /**
   * @description native input aria-label
   */
  label: {
    default: undefined,
    type: String,
  },
  /**
   * @description whether Switch is in loading state
   */
  loading: {
    default: false,
    type: Boolean,
  },
  /**
   * @description binding value, it should be equivalent to either `active-value` or `inactive-value`, by default it's `boolean` type
   */
  modelValue: {
    default: false,
    type: [Boolean, String, Number],
  },
  /**
   * @description input name of Switch
   */
  name: {
    default: '',
    type: String,
  },
  /**
   * @description size of Switch
   */
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  /**
   * @description tabindex for input
   */
  tabindex: {
    type: [String, Number],
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    default: true,
    type: Boolean,
  },
  /**
   * @deprecated binding value ( deprecated, use `model-value / v-model` instead )
   */
  value: {
    default: false,
    type: [Boolean, String, Number],
  },
  /**
   * @description width of Switch
   */
  width: {
    default: '',
    type: [String, Number],
  },
} as const)

export type SwitchProps = ExtractPropTypes<typeof switchProps>

export const switchEmits = {
  [CHANGE_EVENT]: (val: boolean | string | number) =>
    isBoolean(val) || isString(val) || isNumber(val),
  [INPUT_EVENT]: (val: boolean | string | number) =>
    isBoolean(val) || isString(val) || isNumber(val),
  [UPDATE_MODEL_EVENT]: (val: boolean | string | number) =>
    isBoolean(val) || isString(val) || isNumber(val),
}
export type SwitchEmits = typeof switchEmits

export type SwitchInstance = InstanceType<typeof Switch>

import { buildProps, definePropType } from '/@/utils'
import { CircleClose, Clock } from '@element-plus/icons-vue'
import { useSizeProp } from '/@/hooks'
import type TimeSelect from './time-select.vue'
import type { Component, ExtractPropTypes, PropType } from 'vue'

export const timeSelectProps = buildProps({
  /**
   * @description custom clear icon component
   */
  clearIcon: {
    default: () => CircleClose,
    type: definePropType<string | Component>([String, Object]),
  },
  /**
   * @description whether to show clear button
   */
  clearable: {
    default: true,
    type: Boolean,
  },
  /**
   * @description whether TimeSelect is disabled
   */
  disabled: Boolean,
  /**
   * @description whether the input is editable
   */
  editable: {
    default: true,
    type: Boolean,
  },
  /**
   * @description Tooltip theme, built-in theme: `dark` / `light`
   */
  effect: {
    default: 'light',
    type: String as PropType<'light' | 'dark' | string>,
  },
  /**
   * @description end time
   */
  end: {
    default: '18:00',
    type: String,
  },
  /**
   * @description set format of time
   */
  format: {
    default: 'HH:mm',
    type: String,
  },
  /**
   * @description maximum time, any time after this time will be disabled
   */
  maxTime: String,
  /**
   * @description minimum time, any time before this time will be disabled
   */
  minTime: String,
  /**
   * @description binding value
   */
  modelValue: String,
  /**
   * @description same as `name` in native input
   */
  name: String,
  /**
   * @description placeholder in non-range mode
   */
  placeholder: String,
  /**
   * @description custom prefix icon component
   */
  prefixIcon: {
    default: () => Clock,
    type: definePropType<string | Component>([String, Object]),
  },
  /**
   * @description size of Input
   */
  size: useSizeProp,
  /**
   * @description start time
   */
  start: {
    default: '09:00',
    type: String,
  },
  /**
   * @description time step
   */
  step: {
    default: '00:30',
    type: String,
  },
} as const)

export type TimeSelectProps = ExtractPropTypes<typeof timeSelectProps>

export type TimeSelectInstance = InstanceType<typeof TimeSelect>

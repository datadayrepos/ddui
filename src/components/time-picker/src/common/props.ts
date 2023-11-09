import { buildProps, definePropType } from '/@/utils'
import { useSizeProp } from '/@/hooks'
import { CircleClose } from '@element-plus/icons-vue'
import { disabledTimeListsProps } from '../props/shared'

import type { Component, ExtractPropTypes } from 'vue'
import type { Options } from '@datadayrepos/popperts'
import type { Dayjs } from 'dayjs'

export type SingleOrRange<T> = T | [T, T]
export type DateModelType = number | string | Date
export type ModelValueType = SingleOrRange<DateModelType>
export type DayOrDays = SingleOrRange<Dayjs>
export type DateOrDates = SingleOrRange<Date>
export type UserInput = SingleOrRange<string | null>
export type GetDisabledHours = (role: string, comparingDate?: Dayjs) => number[]
export type GetDisabledMinutes = (
  hour: number,
  role: string,
  comparingDate?: Dayjs
) => number[]
export type GetDisabledSeconds = (
  hour: number,
  minute: number,
  role: string,
  comparingDate?: Dayjs
) => number[]

export const timePickerDefaultProps = buildProps({
  /**
   * @description Custom clear icon component
   */
  clearIcon: {
    default: CircleClose,
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
   * @description optional, format of the date displayed value in TimePicker's dropdown
   */
  dateFormat: String,
  /**
   * @description optional, the time value to use when selecting date range
   */
  defaultTime: {
    type: definePropType<SingleOrRange<Date>>([Date, Array]),
  },
  /**
   * @description optional, default date of the calendar
   */
  defaultValue: {
    type: definePropType<SingleOrRange<Date>>([Date, Array]),
  },
  /**
   * @description whether TimePicker is disabled
   */
  disabled: {
    default: false,
    type: Boolean,
  },
  /**
   * @description whether the input is editable
   */
  editable: {
    default: true,
    type: Boolean,
  },
  /**
   * @description placeholder for the end date in range mode
   */
  endPlaceholder: String,
  /**
   * @description format of the displayed value in the input box
   */
  format: String,
  /**
   * @description same as `id` in native input
   */
  id: {
    type: definePropType<SingleOrRange<string>>([Array, String]),
  },
  /**
   * @description whether to pick a time range
   */
  isRange: {
    default: false,
    type: Boolean,
  },
  /**
   * @description binding value, if it is an array, the length should be 2
   */
  modelValue: {
    default: '',
    type: definePropType<ModelValueType>([Date, Array, String, Number]),
  },
  /**
   * @description same as `name` in native input
   */
  name: {
    default: '',
    type: definePropType<SingleOrRange<string>>([Array, String]),
  },
  /**
   * @description placeholder in non-range mode
   */
  placeholder: {
    default: '',
    type: String,
  },
  /**
   * @description custom class name for TimePicker's dropdown
   */
  popperClass: {
    default: '',
    type: String,
  },
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) parameters
   */
  popperOptions: {
    default: () => ({}),
    type: definePropType<Partial<Options>>(Object),
  },
  /**
   * @description Custom prefix icon component
   */
  prefixIcon: {
    default: '',
    type: definePropType<string | Component>([String, Object]),
  },
  /**
   * @description range separator
   */
  rangeSeparator: {
    default: '-',
    type: String,
  },
  /**
   * @description whether TimePicker is read only
   */
  readonly: {
    default: false,
    type: Boolean,
  },
  /**
   * @description size of Input
   */
  size: useSizeProp,
  /**
   * @description placeholder for the start date in range mode
   */
  startPlaceholder: String,
  /**
   * @description optional, format of the time displayed value in TimePicker's dropdown
   */
  timeFormat: String,
  /**
   * @description type of the picker
   */
  type: {
    default: '',
    type: String,
  },
  /**
   * @description optional, format of binding value. If not specified, the binding value will be a Date object
   */
  valueFormat: String,
  ...disabledTimeListsProps,
  /**
   * @description whether to pick time using arrow buttons
   */
  arrowControl: {
    default: false,
    type: Boolean,
  },
  /**
   * @description set custom className
   */
  cellClassName: {
    type: Function,
  },
  /**
   * @description a function determining if a date is disabled with that date as its parameter. Should return a Boolean
   */
  disabledDate: {
    type: Function,
  },
  /**
   * @description same as `aria-label` in native input
   */
  label: {
    default: undefined,
    type: String,
  },
  /**
   * @description an object array to set shortcut options
   */
  shortcuts: {
    default: () => [],
    type: Array,
  },
  /**
   * @description input tabindex
   */
  tabindex: {
    default: 0,
    type: definePropType<string | number>([String, Number]),
  },
  /**
   * @description unlink two date-panels in range-picker
   */
  unlinkPanels: Boolean,
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    default: true,
    type: Boolean,
  },
} as const)

export type TimePickerDefaultProps = ExtractPropTypes<
  typeof timePickerDefaultProps
>

export interface PickerOptions {
  isValidValue: (date: DayOrDays) => boolean
  handleKeydownInput: (event: KeyboardEvent) => void
  parseUserInput: (value: UserInput) => DayOrDays
  formatToString: (value: DayOrDays) => UserInput
  getRangeAvailableTime: (date: DayOrDays) => DayOrDays
  getDefaultValue: () => DayOrDays
  panelReady: boolean
  handleClear: () => void
  handleFocusPicker?: () => void
}

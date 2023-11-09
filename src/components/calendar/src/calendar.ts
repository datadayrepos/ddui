import {
  buildProps,
  definePropType,
  isArray,
  isDate,
} from '/@/utils'
import { INPUT_EVENT, UPDATE_MODEL_EVENT } from '/@/constants'
import type { ExtractPropTypes } from 'vue'

export type CalendarDateType =
  | 'prev-month'
  | 'next-month'
  | 'prev-year'
  | 'next-year'
  | 'today'

function isValidRange(range: unknown): range is [Date, Date] {
  return isArray(range) && range.length === 2 && range.every(item => isDate(item))
}

export const calendarProps = buildProps({
  /**
   * @description binding value
   */
  modelValue: {
    type: Date,
  },
  /**
   * @description time range, including start time and end time.
   *   Start time must be start day of week, end time must be end day of week, the time span cannot exceed two months.
   */
  range: {
    type: definePropType<[Date, Date]>(Array),
    validator: isValidRange,
  },
} as const)
export type CalendarProps = ExtractPropTypes<typeof calendarProps>

export const calendarEmits = {
  [INPUT_EVENT]: (value: Date) => isDate(value),
  [UPDATE_MODEL_EVENT]: (value: Date) => isDate(value),
}
export type CalendarEmits = typeof calendarEmits

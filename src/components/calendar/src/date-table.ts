import { buildProps, definePropType, isObject } from '/@/utils'
import { rangeArr } from '/@/components/time-picker'
import type { ExtractPropTypes } from 'vue'
import type { Dayjs } from 'dayjs'

export type CalendarDateCellType = 'next' | 'prev' | 'current'
export interface CalendarDateCell {
  text: number
  type: CalendarDateCellType
}

export function getPrevMonthLastDays(date: Dayjs, count: number) {
  const lastDay = date.subtract(1, 'month').endOf('month').date()
  return rangeArr(count).map((_, index) => lastDay - (count - index - 1))
}

export function getMonthDays(date: Dayjs) {
  const days = date.daysInMonth()
  return rangeArr(days).map((_, index) => index + 1)
}

export function toNestedArr(days: CalendarDateCell[]) {
  return rangeArr(days.length / 7).map((index) => {
    const start = index * 7
    return days.slice(start, start + 7)
  })
}

export const dateTableProps = buildProps({
  date: {
    required: true,
    type: definePropType<Dayjs>(Object),
  },
  hideHeader: {
    type: Boolean,
  },
  range: {
    type: definePropType<[Dayjs, Dayjs]>(Array),
  },
  selectedDay: {
    type: definePropType<Dayjs>(Object),
  },
} as const)
export type DateTableProps = ExtractPropTypes<typeof dateTableProps>

export const dateTableEmits = {
  pick: (value: Dayjs) => isObject(value),
}
export type DateTableEmits = typeof dateTableEmits

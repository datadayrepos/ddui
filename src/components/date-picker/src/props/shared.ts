import { buildProps, definePropType, isArray } from '/@/utils'
import { datePickTypes } from '/@/constants'

import type { ExtractPropTypes } from 'vue'
import type { Dayjs } from 'dayjs'
import type { DatePickType } from '/@/constants'

const selectionModes = ['date', 'dates', 'year', 'month', 'week', 'range']

export interface RangeState {
  endDate: null | Dayjs
  selecting: boolean
}

export const datePickerSharedProps = buildProps({
  date: {
    required: true,
    type: definePropType<Dayjs>(Object),
  },
  disabledDate: {
    type: definePropType<(date: Date) => boolean>(Function),
  },
  maxDate: {
    type: definePropType<Dayjs | null>(Object),
  },
  minDate: {
    type: definePropType<Dayjs | null>(Object),
  },
  parsedValue: {
    type: definePropType<Dayjs | Dayjs[]>([Object, Array]),
  },
  rangeState: {
    default: () => ({
      endDate: null,
      selecting: false,
    }),
    type: definePropType<RangeState>(Object),
  },
} as const)

export const panelSharedProps = buildProps({
  dateFormat: String,
  timeFormat: String,
  type: {
    required: true,
    type: definePropType<DatePickType>(String),
    values: datePickTypes,
  },
} as const)

export const panelRangeSharedProps = buildProps({
  parsedValue: {
    type: definePropType<Dayjs[]>(Array),
  },
  unlinkPanels: Boolean,
} as const)

export function selectionModeWithDefault(mode: typeof selectionModes[number]) {
  return {
    default: mode,
    type: String,
    values: selectionModes,
  }
}

export const rangePickerSharedEmits = {
  pick: (range: [Dayjs, Dayjs]) => isArray(range),
}

export type RangePickerSharedEmits = typeof rangePickerSharedEmits
export type PanelRangeSharedProps = ExtractPropTypes<
  typeof panelRangeSharedProps
>

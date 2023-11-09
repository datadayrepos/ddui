import { timePickerDefaultProps } from '/@/components/time-picker'
import { buildProps, definePropType } from '/@/utils'

import type { ExtractPropTypes } from 'vue'
import type { IDatePickerType } from '../date-picker.type'

export const datePickerProps = buildProps({
  ...timePickerDefaultProps,
  type: {
    default: 'date',
    type: definePropType<IDatePickerType>(String),
  },
} as const)

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>

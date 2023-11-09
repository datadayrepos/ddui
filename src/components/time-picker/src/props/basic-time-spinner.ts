import { buildProps, definePropType } from '/@/utils'
import { disabledTimeListsProps } from '../props/shared'

import type { ExtractPropTypes } from 'vue'
import type { Dayjs } from 'dayjs'

export const basicTimeSpinnerProps = buildProps({
  amPmMode: {
    default: '',
    // 'a': am/pm; 'A': AM/PM
    type: definePropType<'a' | 'A' | ''>(String),
  },
  arrowControl: Boolean,
  role: {
    required: true,
    type: String,
  },
  showSeconds: {
    default: true,
    type: Boolean,
  },
  spinnerDate: {
    required: true,
    type: definePropType<Dayjs>(Object),
  },
  ...disabledTimeListsProps,
} as const)

export type BasicTimeSpinnerProps = ExtractPropTypes<
  typeof basicTimeSpinnerProps
>

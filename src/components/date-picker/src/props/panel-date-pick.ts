import { buildProps, definePropType } from '/@/utils'
import { panelSharedProps } from './shared'

import type { ExtractPropTypes } from 'vue'
import type { Dayjs } from 'dayjs'

export const panelDatePickProps = buildProps({
  ...panelSharedProps,
  format: {
    default: '',
    type: String,
  },
  parsedValue: {
    type: definePropType<Dayjs | Dayjs[]>([Object, Array]),
  },
  visible: {
    type: Boolean,
  },
} as const)

export type PanelDatePickProps = ExtractPropTypes<typeof panelDatePickProps>

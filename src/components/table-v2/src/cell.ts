import { buildProps, definePropType } from '/@/utils'
import { column } from './common'

import type { ExtractPropTypes, StyleValue } from 'vue'

export const tableV2CellProps = buildProps({
  cellData: {
    type: definePropType<any>([String, Boolean, Number, Object]),
  },
  class: String,
  column,
  columnIndex: Number,
  rowData: {
    type: definePropType<any>(Object),
  },
  rowIndex: Number,
  style: {
    type: definePropType<StyleValue>([String, Array, Object]),
  },
} as const)

export type TableV2CellProps = ExtractPropTypes<typeof tableV2CellProps>

import { buildProps } from '/@/utils'
import { classType, column } from './common'

import type { ExtractPropTypes } from 'vue'

export const tableV2HeaderCell = buildProps({
  class: classType,
  column,
  columnIndex: Number,
})

export type TableV2HeaderCell = ExtractPropTypes<typeof tableV2HeaderCell>

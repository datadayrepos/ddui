import { buildProps, definePropType } from '/@/utils'
import { columns } from './common'

import type { ExtractPropTypes } from 'vue'

const requiredNumberType = {
  required: true,
  type: Number,
} as const

export const tableV2HeaderProps = buildProps({
  class: String,
  columns,
  fixedHeaderData: {
    type: definePropType<any[]>(Array),
  },
  headerData: {
    required: true,
    type: definePropType<any[]>(Array),
  },
  headerHeight: {
    default: 50,
    type: definePropType<number | number[]>([Number, Array]),
  },
  height: requiredNumberType,
  rowHeight: {
    default: 50,
    type: Number,
  },
  rowWidth: requiredNumberType,
  width: requiredNumberType,
} as const)

export type TableV2HeaderProps = ExtractPropTypes<typeof tableV2HeaderProps>

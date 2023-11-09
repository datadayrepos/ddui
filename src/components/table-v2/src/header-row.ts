import { buildProps, definePropType } from '/@/utils'
import { columns } from './common'

import type { CSSProperties, ExtractPropTypes } from 'vue'
import type { KeyType } from './types'

export const tableV2HeaderRowProps = buildProps({
  class: String,
  columns,
  columnsStyles: {
    required: true,
    type: definePropType<Record<KeyType, CSSProperties>>(Object),
  },
  headerIndex: Number,
  style: { type: definePropType<CSSProperties>(Object) },
} as const)

export type TableV2HeaderRowProps = ExtractPropTypes<
  typeof tableV2HeaderRowProps
>

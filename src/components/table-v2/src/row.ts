import { buildProps, definePropType } from '/@/utils'
import { virtualizedGridProps } from '/@/components/virtual-list'
import { columns, expandColumnKey, rowKey } from './common'

import type { CSSProperties, ExtractPropTypes } from 'vue'
import type { FixedDirection, KeyType, RowCommonParams } from './types'

export type RowExpandParams = {
  expanded: boolean
  rowKey: KeyType
} & RowCommonParams

export type RowHoverParams = {
  event: MouseEvent
  hovered: boolean
  rowKey: KeyType
} & RowCommonParams

export type RowEventHandlerParams = {
  rowKey: KeyType
  event: Event
} & RowCommonParams

export interface RowHeightChangedParams {
  rowKey: KeyType
  height: number
  rowIndex: number
}

export type RowExpandHandler = (params: RowExpandParams) => void
export type RowHoverHandler = (params: RowHoverParams) => void
export type RowEventHandler = (params: RowEventHandlerParams) => void
export type RowHeightChangeHandler = (
  row: RowHeightChangedParams,
  fixedDirection: boolean | FixedDirection | undefined
) => void

export interface RowEventHandlers {
  onClick?: RowEventHandler
  onContextmenu?: RowEventHandler
  onDblclick?: RowEventHandler
  onMouseenter?: RowEventHandler
  onMouseleave?: RowEventHandler
}

export const tableV2RowProps = buildProps({
  class: String,
  columns,
  columnsStyles: {
    required: true,
    type: definePropType<Record<KeyType, CSSProperties>>(Object),
  },
  depth: Number,
  estimatedRowHeight: {
    ...virtualizedGridProps.estimatedRowHeight,
    default: undefined,
  },
  expandColumnKey,
  isScrolling: Boolean,
  onRowExpand: {
    type: definePropType<RowExpandHandler>(Function),
  },
  onRowHeightChange: {
    type: definePropType<RowHeightChangeHandler>(Function),
  },
  onRowHover: {
    type: definePropType<RowHoverHandler>(Function),
  },
  rowData: {
    required: true,
    type: definePropType<any>(Object),
  },
  rowEventHandlers: {
    type: definePropType<RowEventHandlers>(Object),
  },
  rowIndex: {
    required: true,
    type: Number,
  },
  /**
   * Unique item key
   */
  rowKey,
  style: {
    type: definePropType<CSSProperties>(Object),
  },
} as const)

export type TableV2RowProps = ExtractPropTypes<typeof tableV2RowProps>

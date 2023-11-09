import { buildProps, definePropType } from '/@/utils'
import {
  virtualizedGridProps,
  virtualizedListProps,
} from '/@/components/virtual-list'
import {
  classType,
  columns,
  dataType,
  fixedDataType,
  requiredNumber,
  styleType,
} from './common'
import { tableV2HeaderProps } from './header'
import { tableV2RowProps } from './row'

import type { ExtractPropTypes } from 'vue'
import type { ItemSize } from '/@/components/virtual-list'

export interface onRowRenderedParams {
  rowCacheStart: number
  rowCacheEnd: number
  rowVisibleStart: number
  rowVisibleEnd: number
}

export const tableV2GridProps = buildProps({
  bodyWidth: requiredNumber,

  /**
   * Special attributes
   */
  cache: virtualizedListProps.cache,

  /**
   * CSS attributes
   */
  class: classType,
  columns,
  containerStyle: styleType,
  data: dataType,

  estimatedRowHeight: tableV2RowProps.estimatedRowHeight,
  fixedData: fixedDataType,

  getRowHeight: {
    required: true,
    type: definePropType<ItemSize>(Function),
  },
  headerHeight: tableV2HeaderProps.headerHeight,
  headerWidth: requiredNumber,
  height: requiredNumber,

  /**
   * Event handlers
   */
  onRowsRendered: {
    type: definePropType<(params: onRowRenderedParams) => void>(Function),
  },
  onScroll: {
    type: definePropType<(...args: any[]) => void>(Function),
  },
  rowHeight: requiredNumber,
  rowKey: tableV2RowProps.rowKey,
  scrollbarAlwaysOn: virtualizedGridProps.scrollbarAlwaysOn,
  scrollbarEndGap: virtualizedGridProps.scrollbarEndGap,

  scrollbarStartGap: virtualizedGridProps.scrollbarStartGap,
  style: styleType,
  useIsScrolling: Boolean,

  /**
   * Size related attributes
   */
  width: requiredNumber,
} as const)

export type TableV2GridProps = ExtractPropTypes<typeof tableV2GridProps>

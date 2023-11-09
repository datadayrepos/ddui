import { buildProps, definePropType } from '/@/utils'
import {
  virtualizedGridProps,
  virtualizedScrollbarProps,
} from '/@/components/virtual-list'
import {
  classType,
  columns,
  dataType,
  expandKeys,
  fixedDataType,
  requiredNumber,
  rowKey,
} from './common'
import { tableV2RowProps } from './row'
import { tableV2HeaderProps } from './header'
import { tableV2GridProps } from './grid'

import type { CSSProperties, ExtractPropTypes } from 'vue'
import type { SortOrder } from './constants'
import type {
  Column,
  ColumnCommonParams,
  DataGetter,
  KeyType,
  RowCommonParams,
  SortBy,
  SortState,
} from './types'

/**
 * Param types
 */
export interface ColumnSortParams<T> {
  column: Column<T>
  key: KeyType
  order: SortOrder
}

/**
 * Renderer/Getter types
 */

export type ExtraCellPropGetter<T> = (
  params: ColumnCommonParams<T> &
  RowCommonParams & { cellData: T; rowData: any }
) => any

export type ExtractHeaderPropGetter<T> = (params: {
  columns: Column<T>[]
  headerIndex: number
}) => any

export type ExtractHeaderCellPropGetter<T> = (
  params: ColumnCommonParams<T> & { headerIndex: number }
) => any

export type ExtractRowPropGetter<T> = (
  params: { columns: Column<T>[] } & RowCommonParams
) => any

export type HeaderClassNameGetter<T> = (params: {
  columns: Column<T>[]
  headerIndex: number
}) => string

export type RowClassNameGetter<T> = (
  params: { columns: Column<T>[] } & RowCommonParams
) => string

/**
 * Handler types
 */
export type ColumnSortHandler<T> = (params: ColumnSortParams<T>) => void
export type ColumnResizeHandler<T> = (column: Column<T>, width: number) => void
export type ExpandedRowsChangeHandler = (expandedRowKeys: KeyType[]) => void

export const tableV2Props = buildProps({
  cache: tableV2GridProps.cache,

  /**
   * Cell attributes
   */
  cellProps: {
    type: definePropType<Record<string, any> | ExtraCellPropGetter<any>>([
      Object,
      Function,
    ]),
  },

  /**
   * Attributes
   */
  class: classType,
  /**
   * Data models
   */
  columns,
  data: dataType,
  dataGetter: {
    type: definePropType<DataGetter<any>>(Function),
  },
  defaultExpandedRowKeys: expandKeys,
  estimatedRowHeight: tableV2RowProps.estimatedRowHeight,
  /**
   * Expanded keys
   */
  expandColumnKey: tableV2RowProps.expandColumnKey,
  expandedRowKeys: expandKeys,
  // disabled: Boolean,
  fixed: Boolean,
  fixedData: fixedDataType,
  /**
   * Footer attributes
   */
  footerHeight: {
    default: 0,
    type: Number,
  },
  hScrollbarSize: virtualizedGridProps.hScrollbarSize,
  headerCellProps: {
    type: definePropType<any | ExtractHeaderCellPropGetter<any>>([
      Object,
      Function,
    ]),
  },
  // Header attributes
  headerClass: {
    type: definePropType<string | HeaderClassNameGetter<any>>([
      String,
      Function,
    ]),
  },
  headerHeight: tableV2HeaderProps.headerHeight,
  headerProps: {
    type: definePropType<any | ExtractHeaderPropGetter<any>>([
      Object,
      Function,
    ]),
  },
  height: requiredNumber,
  iconSize: {
    default: 12,
    type: Number,
  },
  indentSize: {
    default: 12,
    type: Number,
  },
  maxHeight: Number,

  /**
   * Handlers
   */
  onColumnSort: {
    type: definePropType<ColumnSortHandler<any>>(Function),
  },
  onEndReached: {
    type: definePropType<(distance: number) => void>(Function),
  },
  onExpandedRowsChange: {
    type: definePropType<ExpandedRowsChangeHandler>(Function),
  },
  onRowExpand: tableV2RowProps.onRowExpand,
  onRowsRendered: tableV2GridProps.onRowsRendered,
  onScroll: tableV2GridProps.onScroll,
  /**
   * Row attributes
   */
  rowClass: {
    type: definePropType<string | RowClassNameGetter<any>>([String, Function]),
  },
  rowEventHandlers: tableV2RowProps.rowEventHandlers,
  rowHeight: {
    default: 50,
    type: Number,
  },
  rowKey,
  rowProps: {
    type: definePropType<ExtractRowPropGetter<any> | any>([Object, Function]),
  },
  scrollbarAlwaysOn: virtualizedScrollbarProps.alwaysOn,

  /**
   * Sorting
   */
  sortBy: {
    default: () => ({} as { key: KeyType; order: SortOrder }),
    type: definePropType<SortBy>(Object),
  },
  sortState: {
    default: undefined,
    type: definePropType<SortState>(Object),
  },
  style: {
    type: definePropType<CSSProperties>(Object),
  },
  useIsScrolling: Boolean,
  vScrollbarSize: virtualizedGridProps.vScrollbarSize,
  width: requiredNumber,
} as const)

export type TableV2Props = ExtractPropTypes<typeof tableV2Props>

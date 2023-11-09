// @ts-nocheck
import { useSizeProp } from '/@/hooks'
import type {
  CSSProperties,
  ComponentInternalInstance,
  PropType,
  Ref,
  VNode,
} from 'vue'
import type { ComponentSize } from '/@/constants'
import type { Nullable } from '/@/utils'
import type { Store } from '../store'
import type { TableColumnCtx } from '../table-column/defaults'
import type TableLayout from '../table-layout'
import type { TableOverflowTooltipOptions } from '../util'

export type DefaultRow = any

interface TableRefs {
  tableWrapper: HTMLElement
  headerWrapper: HTMLElement
  footerWrapper: HTMLElement
  fixedBodyWrapper: HTMLElement
  rightFixedBodyWrapper: HTMLElement
  bodyWrapper: HTMLElement
  appendWrapper: HTMLElement
  [key: string]: any
}

interface TableState {
  isGroup: Ref<boolean>
  resizeState: Ref<{
    width: any
    height: any
  }>
  doLayout: () => void
  debouncedUpdateLayout: () => void
}

type HoverState<T> = Nullable<{
  cell: HTMLElement
  column: TableColumnCtx<T>
  row: T
}>

interface RIS<T> { row: T; $index: number; store: Store<T>; expanded: boolean }

type RenderExpanded<T> = ({
  row,
  $index,
  store,
  expanded: boolean,
}: RIS<T>) => VNode

type SummaryMethod<T> = (data: {
  columns: TableColumnCtx<T>[]
  data: T[]
}) => string[]

interface Table<T> extends ComponentInternalInstance {
  $ready: boolean
  hoverState?: HoverState<T>
  renderExpanded: RenderExpanded<T>
  store: Store<T>
  layout: TableLayout<T>
  refs: TableRefs
  tableId: string
  state: TableState
}

type ColumnCls<T> = string | ((data: { row: T; rowIndex: number }) => string)
type ColumnStyle<T> =
  | CSSProperties
  | ((data: { row: T; rowIndex: number }) => CSSProperties)
type CellCls<T> =
  | string
  | ((data: {
    row: T
    rowIndex: number
    column: TableColumnCtx<T>
    columnIndex: number
  }) => string)
type CellStyle<T> =
  | CSSProperties
  | ((data: {
    row: T
    rowIndex: number
    column: TableColumnCtx<T>
    columnIndex: number
  }) => CSSProperties)
type Layout = 'fixed' | 'auto'
interface TableProps<T> {
  data: T[]
  size?: ComponentSize
  width?: string | number
  height?: string | number
  maxHeight?: string | number
  fit?: boolean
  stripe?: boolean
  border?: boolean
  rowKey?: string | ((row: T) => string)
  context?: Table<T>
  showHeader?: boolean
  showSummary?: boolean
  sumText?: string
  summaryMethod?: SummaryMethod<T>
  rowClassName?: ColumnCls<T>
  rowStyle?: ColumnStyle<T>
  cellClassName?: CellCls<T>
  cellStyle?: CellStyle<T>
  headerRowClassName?: ColumnCls<T>
  headerRowStyle?: ColumnStyle<T>
  headerCellClassName?: CellCls<T>
  headerCellStyle?: CellStyle<T>
  highlightCurrentRow?: boolean
  currentRowKey?: string | number
  emptyText?: string
  expandRowKeys?: any[]
  defaultExpandAll?: boolean
  defaultSort?: Sort
  tooltipEffect?: string
  tooltipOptions?: TableOverflowTooltipOptions
  spanMethod?: (data: {
    row: T
    rowIndex: number
    column: TableColumnCtx<T>
    columnIndex: number
  }) =>
  | number[]
  | {
    rowspan: number
    colspan: number
  }
  | undefined
  selectOnIndeterminate?: boolean
  indent?: number
  treeProps?: {
    hasChildren?: string
    children?: string
  }
  lazy?: boolean
  load?: (row: T, treeNode: TreeNode, resolve: (data: T[]) => void) => void
  className?: string
  style?: CSSProperties
  tableLayout?: Layout
  scrollbarAlwaysOn?: boolean
  flexible?: boolean
  showOverflowTooltip?: boolean | TableOverflowTooltipOptions
}

interface Sort {
  prop: string
  order: 'ascending' | 'descending'
  init?: any
  silent?: any
}

interface Filter<T> {
  column: TableColumnCtx<T>
  values: string[]
  silent: any
}

interface TreeNode {
  expanded?: boolean
  loading?: boolean
  noLazyChildren?: boolean
  indent?: number
  level?: number
  display?: boolean
}

interface RenderRowData<T> {
  store: Store<T>
  _self: Table<T>
  column: TableColumnCtx<T>
  row: T
  $index: number
  treeNode?: TreeNode
  expanded: boolean
}

export default {
  border: Boolean,
  cellClassName: [String, Function] as PropType<
    TableProps<DefaultRow>['cellClassName']
  >,
  cellStyle: [Object, Function] as PropType<
    TableProps<DefaultRow>['cellStyle']
  >,
  className: {
    default: '',
    type: String,
  },
  currentRowKey: [String, Number],
  data: {
    default: () => [],
    type: Array as PropType<DefaultRow[]>,
  },
  defaultExpandAll: Boolean,
  defaultSort: Object as PropType<TableProps<DefaultRow>['defaultSort']>,
  emptyText: String,
  expandRowKeys: Array as PropType<TableProps<DefaultRow>['expandRowKeys']>,
  fit: {
    default: true,
    type: Boolean,
  },
  flexible: Boolean,
  headerCellClassName: [String, Function] as PropType<
    TableProps<DefaultRow>['headerCellClassName']
  >,
  headerCellStyle: [Object, Function] as PropType<
    TableProps<DefaultRow>['headerCellStyle']
  >,
  headerRowClassName: [String, Function] as PropType<
    TableProps<DefaultRow>['headerRowClassName']
  >,
  headerRowStyle: [Object, Function] as PropType<
    TableProps<DefaultRow>['headerRowStyle']
  >,
  height: [String, Number],
  highlightCurrentRow: Boolean,
  indent: {
    default: 16,
    type: Number,
  },
  lazy: Boolean,
  load: Function as PropType<TableProps<DefaultRow>['load']>,
  maxHeight: [String, Number],
  rowClassName: [String, Function] as PropType<
    TableProps<DefaultRow>['rowClassName']
  >,
  rowKey: [String, Function] as PropType<TableProps<DefaultRow>['rowKey']>,
  rowStyle: [Object, Function] as PropType<TableProps<DefaultRow>['rowStyle']>,
  scrollbarAlwaysOn: {
    default: false,
    type: Boolean,
  },
  selectOnIndeterminate: {
    default: true,
    type: Boolean,
  },
  showHeader: {
    default: true,
    type: Boolean,
  },
  showOverflowTooltip: [Boolean, Object] as PropType<
    TableProps<DefaultRow>['showOverflowTooltip']
  >,
  showSummary: Boolean,
  size: useSizeProp,
  spanMethod: Function as PropType<TableProps<DefaultRow>['spanMethod']>,
  stripe: Boolean,
  style: {
    default: () => ({}),
    type: Object as PropType<CSSProperties>,
  },
  sumText: String,
  summaryMethod: Function as PropType<TableProps<DefaultRow>['summaryMethod']>,
  tableLayout: {
    default: 'fixed',
    type: String as PropType<Layout>,
  },
  tooltipEffect: String,
  tooltipOptions: Object as PropType<TableProps<DefaultRow>['tooltipOptions']>,
  treeProps: {
    default: () => {
      return {
        children: 'children',
        hasChildren: 'hasChildren',
      }
    },
    type: Object as PropType<TableProps<DefaultRow>['treeProps']>,
  },
  width: [String, Number],
}
export type {
  SummaryMethod,
  Table,
  TableProps,
  TableRefs,
  ColumnCls,
  ColumnStyle,
  CellCls,
  CellStyle,
  TreeNode,
  RenderRowData,
  Sort,
  Filter,
  TableColumnCtx,
}

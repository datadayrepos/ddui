// @ts-nocheck
import type { ComponentInternalInstance, PropType, Ref, VNode } from 'vue'
import type { DefaultRow, Table } from '../table/defaults'
import type { TableOverflowTooltipOptions } from '../util'

interface CI<T> { column: TableColumnCtx<T>; $index: number }

type Filters = {
  text: string
  value: string
}[]

type FilterMethods<T> = (value, row: T, column: TableColumnCtx<T>) => void

type ValueOf<T> = T[keyof T]

interface TableColumnCtx<T> {
  id: string
  realWidth: number
  type: string
  label: string
  className: string
  labelClassName: string
  property: string
  prop: string
  width: string | number
  minWidth: string | number
  renderHeader: (data: CI<T>) => VNode
  sortable: boolean | string
  sortMethod: (a: T, b: T) => number
  sortBy: string | ((row: T, index: number) => string) | string[]
  resizable: boolean
  columnKey: string
  rawColumnKey: string
  align: string
  headerAlign: string
  showOverflowTooltip?: boolean | TableOverflowTooltipOptions
  fixed: boolean | string
  formatter: (
    row: T,
    column: TableColumnCtx<T>,
    cellValue,
    index: number
  ) => VNode | string
  selectable: (row: T, index: number) => boolean
  reserveSelection: boolean
  filterMethod: FilterMethods<T>
  filteredValue: string[]
  filters: Filters
  filterPlacement: string
  filterMultiple: boolean
  index: number | ((index: number) => number)
  sortOrders: ('ascending' | 'descending' | null)[]
  renderCell: (data: any) => void
  colSpan: number
  rowSpan: number
  children: TableColumnCtx<T>[]
  level: number
  filterable: boolean | FilterMethods<T> | Filters
  order: string
  isColumnGroup: boolean
  isSubColumn: boolean
  columns: TableColumnCtx<T>[]
  getColumnIndex: () => number
  no: number
  filterOpened?: boolean
}

interface TableColumn<T> extends ComponentInternalInstance {
  vnode: {
    vParent: TableColumn<T> | Table<T>
  } & VNode
  vParent: TableColumn<T> | Table<T>
  columnId: string
  columnConfig: Ref<Partial<TableColumnCtx<T>>>
}

export type { Filters, FilterMethods, TableColumnCtx, TableColumn, ValueOf }

export default {
  align: String,
  className: String,
  columnKey: String,
  filterMethod: Function as PropType<
    TableColumnCtx<DefaultRow>['filterMethod']
  >,
  filterMultiple: {
    default: true,
    type: Boolean,
  },
  filterPlacement: String,
  filteredValue: Array as PropType<TableColumnCtx<DefaultRow>['filteredValue']>,
  filters: Array as PropType<TableColumnCtx<DefaultRow>['filters']>,
  fixed: [Boolean, String],
  formatter: Function as PropType<TableColumnCtx<DefaultRow>['formatter']>,
  headerAlign: String,
  index: [Number, Function] as PropType<TableColumnCtx<DefaultRow>['index']>,
  label: String,
  labelClassName: String,
  minWidth: {
    default: '',
    type: [String, Number],
  },
  prop: String,
  property: String,
  renderHeader: Function as PropType<
    TableColumnCtx<DefaultRow>['renderHeader']
  >,
  reserveSelection: Boolean,
  resizable: {
    default: true,
    type: Boolean,
  },
  selectable: Function as PropType<TableColumnCtx<DefaultRow>['selectable']>,
  showOverflowTooltip: {
    default: undefined,
    type: [Boolean, Object] as PropType<
      TableColumnCtx<DefaultRow>['showOverflowTooltip']
    >,
  },
  sortBy: [String, Function, Array] as PropType<
    TableColumnCtx<DefaultRow>['sortBy']
  >,
  sortMethod: Function as PropType<TableColumnCtx<DefaultRow>['sortMethod']>,
  sortOrders: {
    default: () => {
      return ['ascending', 'descending', null]
    },
    type: Array as PropType<TableColumnCtx<DefaultRow>['sortOrders']>,
    validator: (val: TableColumnCtx<unknown>['sortOrders']) => {
      return val.every((order: string) =>
        ['ascending', 'descending', null].includes(order),
      )
    },
  },
  sortable: {
    default: false,
    type: [Boolean, String],
  },
  type: {
    default: 'default',
    type: String,
  },
  width: {
    default: '',
    type: [String, Number],
  },
}

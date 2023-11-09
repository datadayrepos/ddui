import {
  buildProp,
  buildProps,
  definePropType,
  mutable,
} from '/@/utils'
import { VERTICAL } from './defaults'

import type { ExtractPropTypes, StyleValue } from 'vue'
import type { GridItemKeyGetter, ItemSize } from './types'

const itemSize = buildProp({
  required: true,
  type: definePropType<number | ItemSize>([Number, Function]),
} as const)

const estimatedItemSize = buildProp({
  type: Number,
} as const)

const cache = buildProp({
  default: 2,
  type: Number,
} as const)

const direction = buildProp({
  default: 'ltr',
  type: String,
  values: ['ltr', 'rtl'],
} as const)

const initScrollOffset = buildProp({
  default: 0,
  type: Number,
} as const)

const total = buildProp({
  required: true,
  type: Number,
} as const)

const layout = buildProp({
  default: VERTICAL,
  type: String,
  values: ['horizontal', 'vertical'],
} as const)

export const virtualizedProps = buildProps({
  className: {
    default: '',
    type: String,
  },

  containerElement: {
    default: 'div',
    type: definePropType<string | Element>([String, Object]),
  },

  data: {
    default: () => mutable([] as const),
    type: definePropType<any[]>(Array),
  },

  /**
   * @description controls the horizontal direction.
   */
  direction,

  height: {
    required: true,
    type: [String, Number],
  },

  innerElement: {
    default: 'div',
    type: [String, Object],
  },

  perfMode: {
    default: true,
    type: Boolean,
  },

  scrollbarAlwaysOn: {
    default: false,
    type: Boolean,
  },

  style: {
    type: definePropType<StyleValue>([Object, String, Array]),
  },

  useIsScrolling: {
    default: false,
    type: Boolean,
  },
  width: {
    required: false,
    type: [Number, String],
  },
} as const)

export const virtualizedListProps = buildProps({
  /**
   * @description describes how many items should be pre rendered to the head
   * and the tail of the window
   */
  cache,

  estimatedItemSize,
  initScrollOffset,

  itemSize,

  /**
   * @description controls the list's orientation
   */
  layout,

  /**
   * @description describes the total number of the list.
   */

  total,
  ...virtualizedProps,
} as const)

const scrollbarSize = {
  default: 6,
  type: Number,
} as const

const startGap = { default: 0, type: Number } as const
const endGap = { default: 2, type: Number } as const

export const virtualizedGridProps = buildProps({
  columnCache: cache,
  columnWidth: itemSize,
  estimatedColumnWidth: estimatedItemSize,
  estimatedRowHeight: estimatedItemSize,
  hScrollbarSize: scrollbarSize,
  initScrollLeft: initScrollOffset,
  initScrollTop: initScrollOffset,
  itemKey: {
    default: ({
      columnIndex,
      rowIndex,
    }: {
      columnIndex: number
      rowIndex: number
    }) => `${rowIndex}:${columnIndex}`,
    type: definePropType<GridItemKeyGetter>(Function),
  },
  role: String,
  rowCache: cache,
  rowHeight: itemSize,
  scrollbarEndGap: endGap,
  scrollbarStartGap: startGap,
  totalColumn: total,
  totalRow: total,
  vScrollbarSize: scrollbarSize,
  ...virtualizedProps,
} as const)

export const virtualizedScrollbarProps = buildProps({
  alwaysOn: Boolean,
  class: String,
  clientSize: {
    required: true,
    type: Number,
  },
  endGap,
  layout,
  ratio: {
    required: true,
    type: Number,
  },
  scrollFrom: {
    required: true,
    type: Number,
  },
  scrollbarSize,
  startGap,
  total,

  visible: Boolean,
} as const)

export type VirtualizedProps = ExtractPropTypes<typeof virtualizedProps>
export type VirtualizedListProps = ExtractPropTypes<typeof virtualizedListProps>
export type VirtualizedGridProps = ExtractPropTypes<typeof virtualizedGridProps>

export type VirtualizedScrollbarProps = ExtractPropTypes<
  typeof virtualizedScrollbarProps
>

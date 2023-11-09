import { buildProps, definePropType, mutable } from '/@/utils'
import type { ExtractPropTypes } from 'vue'
import type Col from './col.vue'

export interface ColSizeObject {
  span?: number
  offset?: number
  pull?: number
  push?: number
}
export type ColSize = number | ColSizeObject

export const colProps = buildProps({
  /**
   * @description `≥1200px` Responsive columns or column props object
   */
  lg: {
    default: () => mutable({} as const),
    type: definePropType<ColSize>([Number, Object]),
  },
  /**
   * @description `≥992px` Responsive columns or column props object
   */
  md: {
    default: () => mutable({} as const),
    type: definePropType<ColSize>([Number, Object]),
  },
  /**
   * @description number of spacing on the left side of the grid
   */
  offset: {
    default: 0,
    type: Number,
  },
  /**
   * @description number of columns that grid moves to the left
   */
  pull: {
    default: 0,
    type: Number,
  },
  /**
   * @description number of columns that grid moves to the right
   */
  push: {
    default: 0,
    type: Number,
  },
  /**
   * @description `≥768px` Responsive columns or column props object
   */
  sm: {
    default: () => mutable({} as const),
    type: definePropType<ColSize>([Number, Object]),
  },
  /**
   * @description number of column the grid spans
   */
  span: {
    default: 24,
    type: Number,
  },
  /**
   * @description custom element tag
   */
  tag: {
    default: 'div',
    type: String,
  },
  /**
   * @description `≥1920px` Responsive columns or column props object
   */
  xl: {
    default: () => mutable({} as const),
    type: definePropType<ColSize>([Number, Object]),
  },
  /**
   * @description `<768px` Responsive columns or column props object
   */
  xs: {
    default: () => mutable({} as const),
    type: definePropType<ColSize>([Number, Object]),
  },
} as const)
export type ColProps = ExtractPropTypes<typeof colProps>
export type ColInstance = InstanceType<typeof Col>

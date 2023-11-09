import { buildProps } from '/@/utils'
import type { ExtractPropTypes } from 'vue'
import type Row from './row.vue'

export const RowJustify = [
  'start',
  'center',
  'end',
  'space-around',
  'space-between',
  'space-evenly',
] as const

export const RowAlign = ['top', 'middle', 'bottom'] as const

export const rowProps = buildProps({
  /**
   * @description vertical alignment of flex layout
   */
  align: {
    type: String,
    values: RowAlign,
  },
  /**
   * @description grid spacing
   */
  gutter: {
    default: 0,
    type: Number,
  },
  /**
   * @description horizontal alignment of flex layout
   */
  justify: {
    default: 'start',
    type: String,
    values: RowJustify,
  },
  /**
   * @description custom element tag
   */
  tag: {
    default: 'div',
    type: String,
  },
} as const)

export type RowProps = ExtractPropTypes<typeof rowProps>
export type RowInstance = InstanceType<typeof Row>

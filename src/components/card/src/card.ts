import { buildProps, definePropType } from '/@/utils'
import type { ExtractPropTypes, StyleValue } from 'vue'

export const cardProps = buildProps({
  /**
   * @description custom class name of card body
   */
  bodyClass: String,
  /**
   * @description CSS style of card body
   */
  bodyStyle: {
    default: '',
    type: definePropType<StyleValue>([String, Object, Array]),
  },
  /**
   * @description title of the card. Also accepts a DOM passed by `slot#header`
   */
  header: {
    default: '',
    type: String,
  },
  /**
   * @description when to show card shadows
   */
  shadow: {
    default: 'always',
    type: String,
    values: ['always', 'hover', 'never'],
  },
} as const)
export type CardProps = ExtractPropTypes<typeof cardProps>

import { buildProps, definePropType } from '/@/utils'
import type { ExtractPropTypes } from 'vue'
import type Divider from './divider.vue'

export type BorderStyle = CSSStyleDeclaration['borderStyle']

export const dividerProps = buildProps({
  /**
   * @description the position of the customized content on the divider line
   */
  borderStyle: {
    default: 'solid',
    type: definePropType<BorderStyle>(String),
  },
  /**
   * @description Set the style of divider
   */
  contentPosition: {
    default: 'center',
    type: String,
    values: ['left', 'center', 'right'],
  },
  /**
   * @description Set divider's direction
   */
  direction: {
    default: 'horizontal',
    type: String,
    values: ['horizontal', 'vertical'],
  },
} as const)
export type DividerProps = ExtractPropTypes<typeof dividerProps>

export type DividerInstance = InstanceType<typeof Divider>

import { buildProps, definePropType, isNumber } from '/@/utils'
import type { ExtractPropTypes, StyleValue } from 'vue'
import type Scrollbar from './scrollbar.vue'

export const scrollbarProps = buildProps({
  /**
   * @description always show
   */
  always: Boolean,
  /**
   * @description aria-label of view
   */
  ariaLabel: String,
  /**
   * @description aria-orientation of view
   */
  ariaOrientation: {
    type: String,
    values: ['horizontal', 'vertical'],
  },
  /**
   * @description height of scrollbar
   */
  height: {
    default: '',
    type: [String, Number],
  },
  /**
   * @description id of view
   */
  id: String,
  /**
   * @description max height of scrollbar
   */
  maxHeight: {
    default: '',
    type: [String, Number],
  },
  /**
   * @description minimum size of scrollbar
   */
  minSize: {
    default: 20,
    type: Number,
  },
  /**
   * @description whether to use the native scrollbar
   */
  native: {
    default: false,
    type: Boolean,
  },
  /**
   * @description do not respond to container size changes, if the container size does not change, it is better to set it to optimize performance
   */
  noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
  /**
   * @description role of view
   */
  role: String,
  /**
   * @description element tag of the view
   */
  tag: {
    default: 'div',
    type: String,
  },
  /**
   * @description class of view
   */
  viewClass: {
    default: '',
    type: [String, Array],
  },
  /**
   * @description style of view
   */
  viewStyle: {
    default: '',
    type: [String, Array, Object],
  },
  /**
   * @description class of wrap
   */
  wrapClass: {
    default: '',
    type: [String, Array],
  },
  /**
   * @description style of wrap
   */
  wrapStyle: {
    default: '',
    type: definePropType<StyleValue>([String, Object, Array]),
  },
} as const)
export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>

export const scrollbarEmits = {
  scroll: ({
    scrollTop,
    scrollLeft,
  }: {
    scrollTop: number
    scrollLeft: number
  }) => [scrollTop, scrollLeft].every(isNumber),
}
export type ScrollbarEmits = typeof scrollbarEmits

export type ScrollbarInstance = InstanceType<typeof Scrollbar>

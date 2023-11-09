import { buildProps, definePropType } from '/@/utils'
import type { ExtractPropTypes, SVGAttributes } from 'vue'
import type Progress from './progress.vue'

export interface ProgressColor { color: string; percentage: number }
export type ProgressFn = (percentage: number) => string

export const progressProps = buildProps({
  /**
   * @description background color of progress bar. Overrides `status` prop
   */
  color: {
    default: '',
    type: definePropType<string | ProgressColor[] | ProgressFn>([
      String,
      Array,
      Function,
    ]),
  },
  /**
   * @description control the animation duration of indeterminate progress or striped flow progress
   */
  duration: {
    default: 3,
    type: Number,
  },
  /**
   * @description custom text format
   */
  format: {
    default: (percentage: number): string => `${percentage}%`,
    type: definePropType<ProgressFn>(Function),
  },
  /**
   * @description set indeterminate progress
   */
  indeterminate: {
    default: false,
    type: Boolean,
  },
  /**
   * @description percentage, required
   */
  percentage: {
    default: 0,
    type: Number,
    validator: (val: number): boolean => val >= 0 && val <= 100,
  },
  /**
   * @description whether to show percentage
   */
  showText: {
    default: true,
    type: Boolean,
  },
  /**
   * @description the current status of progress bar
   */
  status: {
    default: '',
    type: String,
    values: ['', 'success', 'exception', 'warning'],
  },
  /**
   * @description stripe over the progress bar's color
   */
  striped: Boolean,
  /**
   * @description get the stripes to flow
   */
  stripedFlow: Boolean,
  /**
   * @description butt/circle/dashboard type shape at the end path
   */
  strokeLinecap: {
    default: 'round',
    type: definePropType<NonNullable<SVGAttributes['stroke-linecap']>>(String),
  },
  /**
   * @description the width of progress bar
   */
  strokeWidth: {
    default: 6,
    type: Number,
  },
  /**
   * @description whether to place the percentage inside progress bar, only works when `type` is 'line'
   */
  textInside: {
    default: false,
    type: Boolean,
  },
  /**
   * @description type of progress bar
   */
  type: {
    default: 'line',
    type: String,
    values: ['line', 'circle', 'dashboard'],
  },
  /**
   * @description the canvas width of circle progress bar
   */
  width: {
    default: 126,
    type: Number,
  },
} as const)

export type ProgressProps = ExtractPropTypes<typeof progressProps>
export type ProgressInstance = InstanceType<typeof Progress>

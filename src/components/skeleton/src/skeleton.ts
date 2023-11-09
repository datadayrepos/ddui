import { buildProps } from '/@/utils'
import type Skeleton from './skeleton.vue'
import type { ExtractPropTypes } from 'vue'

export const skeletonProps = buildProps({
  /**
   * @description whether showing the animation
   */
  animated: {
    default: false,
    type: Boolean,
  },
  /**
   * @description how many fake items to render to the DOM
   */
  count: {
    default: 1,
    type: Number,
  },
  /**
   * @description numbers of the row, only useful when no template slot were given
   */
  loading: {
    default: true,
    type: Boolean,
  },
  /**
   * @description whether showing the real DOM
   */
  rows: {
    default: 3,
    type: Number,
  },
  /**
   * @description rendering delay in milliseconds
   */
  throttle: {
    type: Number,
  },
} as const)
export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>

export type SkeletonInstance = InstanceType<typeof Skeleton>

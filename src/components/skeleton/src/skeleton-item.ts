import { buildProps } from '/@/utils'
import type SkeletonItem from './skeleton-item.vue'
import type { ExtractPropTypes } from 'vue'

export const skeletonItemProps = buildProps({
  /**
   * @description the current rendering skeleton type
   */
  variant: {
    default: 'text',
    type: String,
    values: [
      'circle',
      'rect',
      'h1',
      'h3',
      'text',
      'caption',
      'p',
      'image',
      'button',
    ],
  },
} as const)
export type SkeletonItemProps = ExtractPropTypes<typeof skeletonItemProps>

export type SkeletonItemInstance = InstanceType<typeof SkeletonItem>

import { buildProps } from '/@/utils'
import { useSizeProp } from '/@/hooks'

import type Description from './description.vue'

export const descriptionProps = buildProps({
  /**
   * @description with or without border
   */
  border: {
    default: false,
    type: Boolean,
  },
  /**
   * @description numbers of `Descriptions Item` in one line
   */
  column: {
    default: 3,
    type: Number,
  },
  /**
   * @description direction of list
   */
  direction: {
    default: 'horizontal',
    type: String,
    values: ['horizontal', 'vertical'],
  },
  /**
   * @description extra text, display on the top right
   */
  extra: {
    default: '',
    type: String,
  },
  /**
   * @description size of list
   */
  size: useSizeProp,
  /**
   * @description title text, display on the top left
   */
  title: {
    default: '',
    type: String,
  },
} as const)

export type DescriptionInstance = InstanceType<typeof Description>

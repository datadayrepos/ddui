import { buildProps } from '/@/utils'
import type { ExtractPropTypes } from 'vue'

export const emptyProps = buildProps({
  /**
   * @description description of empty
   */
  description: {
    default: '',
    type: String,
  },
  /**
   * @description image URL of empty
   */
  image: {
    default: '',
    type: String,
  },
  /**
   * @description image size (width) of empty
   */
  imageSize: Number,
} as const)

export type EmptyProps = ExtractPropTypes<typeof emptyProps>

import { buildProps } from '/@/utils'
import type { ExtractPropTypes } from 'vue'
import type Thumb from './thumb.vue'

export const thumbProps = buildProps({
  always: Boolean,
  move: Number,
  ratio: {
    required: true,
    type: Number,
  },
  size: String,
  vertical: Boolean,
} as const)
export type ThumbProps = ExtractPropTypes<typeof thumbProps>

export type ThumbInstance = InstanceType<typeof Thumb>

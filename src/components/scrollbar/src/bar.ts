import { buildProps } from '/@/utils'
import type { ExtractPropTypes } from 'vue'
import type Bar from './bar.vue'

export const barProps = buildProps({
  always: {
    default: true,
    type: Boolean,
  },
  height: String,
  ratioX: {
    default: 1,
    type: Number,
  },
  ratioY: {
    default: 1,
    type: Number,
  },
  width: String,
} as const)
export type BarProps = ExtractPropTypes<typeof barProps>

export type BarInstance = InstanceType<typeof Bar>

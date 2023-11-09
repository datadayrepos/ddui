import { buildProps, definePropType } from '/@/utils'
import type { StyleValue } from 'vue'

export const visualHiddenProps = buildProps({
  style: {
    default: () => ({}),
    type: definePropType<StyleValue>([String, Object, Array]),
  },
} as const)

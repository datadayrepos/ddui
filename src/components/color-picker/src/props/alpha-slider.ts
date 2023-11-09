import { buildProps, definePropType } from '/@/utils'

import type { ExtractPropTypes } from 'vue'
import type Color from '../utils/color'

export const alphaSliderProps = buildProps({
  color: {
    required: true,
    type: definePropType<Color>(Object),
  },
  vertical: {
    default: false,
    type: Boolean,
  },
} as const)

export type AlphaSliderProps = ExtractPropTypes<typeof alphaSliderProps>

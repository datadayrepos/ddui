import { buildProps, definePropType } from '/@/utils'
import { tooltipV2Sides } from './common'

import type { CSSProperties, ExtractPropTypes } from 'vue'
import type { TooltipV2Sides } from './common'

export const tooltipV2ArrowProps = buildProps({
  height: {
    default: 10,
    type: Number,
  },
  style: {
    default: null,
    type: definePropType<CSSProperties | null>(Object),
  },
  width: {
    default: 10,
    type: Number,
  },
} as const)

export const tooltipV2ArrowSpecialProps = buildProps({
  side: {
    required: true,
    type: definePropType<TooltipV2Sides>(String),
    values: tooltipV2Sides,
  },
} as const)

export type TooltipV2ArrowProps = ExtractPropTypes<typeof tooltipV2ArrowProps>

import { buildProps, definePropType } from '/@/utils'

import type { ExtractPropTypes } from 'vue'
import type { Placement, Strategy, VirtualElement } from '@floating-ui/dom'

const tooltipV2Strategies = ['absolute', 'fixed'] as const

const tooltipV2Placements = [
  'top-start',
  'top-end',
  'top',
  'bottom-start',
  'bottom-end',
  'bottom',
  'left-start',
  'left-end',
  'left',
  'right-start',
  'right-end',
  'right',
] as const

export const tooltipV2ContentProps = buildProps({
  ariaLabel: String,
  arrowPadding: {
    default: 5,
    type: definePropType<number>(Number),
  },
  contentClass: String,
  effect: {
    default: '',
    type: String,
  },
  offset: {
    default: 8,
    type: Number,
  },
  /**
   * Placement of tooltip content relative to reference element (when absent it refers to trigger)
   */
  placement: {
    default: 'bottom',
    type: definePropType<Placement>(String),
    values: tooltipV2Placements,
  },
  /**
   * Reference element for tooltip content to set its position
   */
  reference: {
    default: null,
    type: definePropType<HTMLElement | VirtualElement | null>(Object),
  },
  showArrow: {
    default: false,
    type: Boolean,
  },
  strategy: {
    default: 'absolute',
    type: definePropType<Strategy>(String),
    values: tooltipV2Strategies,
  },
} as const)

export type TooltipV2ContentProps = ExtractPropTypes<
  typeof tooltipV2ContentProps
>

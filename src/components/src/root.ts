import { buildProps, definePropType } from '/@/utils'

import type { ExtractPropTypes } from 'vue'

type StateUpdater = (state: boolean) => void

export const tooltipV2RootProps = buildProps({
  'defaultOpen': Boolean,
  'delayDuration': {
    default: 300,
    type: Number,
  },
  'onOpenChange': {
    type: definePropType<StateUpdater>(Function),
  },
  'onUpdate:open': {
    type: definePropType<StateUpdater>(Function),
  },
  'open': {
    default: undefined,
    type: Boolean,
  },
} as const)

export type TooltipV2RootProps = ExtractPropTypes<typeof tooltipV2RootProps>

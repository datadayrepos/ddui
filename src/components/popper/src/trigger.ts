import { buildProps, definePropType } from '/@/utils'

import type { Measurable } from './constants'
import type Trigger from './trigger.vue'

export const popperTriggerProps = buildProps({
  id: String,
  onBlur: {
    type: definePropType<(e: Event) => void>(Function),
  },
  onClick: {
    type: definePropType<(e: Event) => void>(Function),
  },
  onContextmenu: {
    type: definePropType<(e: Event) => void>(Function),
  },
  onFocus: {
    type: definePropType<(e: Event) => void>(Function),
  },
  onKeydown: {
    type: definePropType<(e: Event) => void>(Function),
  },
  onMouseenter: {
    type: definePropType<(e: Event) => void>(Function),
  },
  onMouseleave: {
    type: definePropType<(e: Event) => void>(Function),
  },
  open: Boolean,
  virtualRef: {
    type: definePropType<Measurable>(Object),
  },
  virtualTriggering: Boolean,
} as const)

export type PopperTriggerProps = typeof popperTriggerProps

export type PopperTriggerInstance = InstanceType<typeof Trigger>

/** @deprecated use `popperTriggerProps` instead, and it will be deprecated in the next major version */
export const usePopperTriggerProps = popperTriggerProps

/** @deprecated use `PopperTriggerInstance` instead, and it will be deprecated in the next major version */
export type ElPopperArrowTrigger = PopperTriggerInstance

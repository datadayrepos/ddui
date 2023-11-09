import { buildProps, definePropType } from '/@/utils'
import { popperTriggerProps } from '/@/components/popper'
import { EVENT_CODE } from '/@/constants'
import type { Arrayable } from '/@/utils'
import type { ExtractPropTypes } from 'vue'

export type TooltipTriggerType = 'hover' | 'focus' | 'click' | 'contextmenu'

export const useTooltipTriggerProps = buildProps({
  ...popperTriggerProps,
  /**
   * @description whether Tooltip is disabled
   */
  disabled: Boolean,
  /**
   * @description How should the tooltip be triggered (to show)
   */
  trigger: {
    default: 'hover',
    type: definePropType<Arrayable<TooltipTriggerType>>([String, Array]),
  },
  /**
   * @description When you click the mouse to focus on the trigger element, you can define a set of keyboard codes to control the display of tooltip through the keyboard
   */
  triggerKeys: {
    default: () => [EVENT_CODE.enter, EVENT_CODE.space],
    type: definePropType<string[]>(Array),
  },
} as const)

export type ElTooltipTriggerProps = ExtractPropTypes<
  typeof useTooltipTriggerProps
>

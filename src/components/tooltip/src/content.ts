import { buildProps, definePropType } from '/@/utils'
import { popperContentProps } from '/@/components/popper'
import { useDelayedToggleProps } from '/@/hooks'

import type TooltipContent from './content.vue'
import type { ExtractPropTypes } from 'vue'

export const useTooltipContentProps = buildProps({
  ...useDelayedToggleProps,
  ...popperContentProps,
  /**
   * @description which element the tooltip CONTENT appends to
   */
  appendTo: {
    type: definePropType<string | HTMLElement>([String, Object]),
  },
  /**
   * @description same as `aria-label`
   */
  ariaLabel: String,
  /**
   * @description display content, can be overridden by `slot#content`
   */
  content: {
    default: '',
    type: String,
  },
  /**
   * @description whether Tooltip is disabled
   */
  disabled: Boolean,
  /**
   * @description when tooltip inactive and `persistent` is `false` , popconfirm will be destroyed
   */
  persistent: Boolean,
  /**
   * @description whether `content` is treated as HTML string
   */
  rawContent: {
    default: false,
    type: Boolean,
  },
  /**
   * @description whether tooltip content is teleported, if `true` it will be teleported to where `append-to` sets
   */
  teleported: {
    default: true,
    type: Boolean,
  },
  /**
   * @description animation name
   */
  transition: String,
  // because model toggle prop is generated dynamically
  // so the typing cannot be evaluated by typescript as type:
  // [name]: { type: Boolean, default: null }
  // so we need to declare that again for type checking.
  /**
   * @description visibility of Tooltip
   */
  visible: {
    default: null,
    type: definePropType<boolean | null>(Boolean),
  },
} as const)

export type ElTooltipContentProps = ExtractPropTypes<
  typeof useTooltipContentProps
>

export type TooltipContentInstance = InstanceType<typeof TooltipContent>

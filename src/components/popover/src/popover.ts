import { buildProps, isBoolean } from '/@/utils'
import {
  useTooltipContentProps,
  useTooltipTriggerProps,
} from '/@/components/tooltip'
import { dropdownProps } from '/@/components/dropdown'
import type { ExtractPropTypes, PropType } from 'vue'
import type Popover from './popover.vue'

export const popoverProps = buildProps({
  'autoClose': {
    default: 0,
    type: Number,
  },
  'content': useTooltipContentProps.content,
  'disabled': useTooltipTriggerProps.disabled,
  'effect': {
    ...useTooltipContentProps.effect,
    default: 'light',
  },
  'enterable': {
    ...useTooltipContentProps.enterable,
    default: true,
  },
  'hideAfter': {
    default: 200,
    type: Number,
  },
  'offset': {
    default: undefined,
    type: Number,
  },
  'onUpdate:visible': {
    type: Function as PropType<(visible: boolean) => void>,
  },
  'persistent': {
    default: true,
    type: Boolean,
  },
  'placement': dropdownProps.placement,
  'popperClass': useTooltipContentProps.popperClass,
  'popperOptions': dropdownProps.popperOptions,
  'popperStyle': useTooltipContentProps.popperStyle,
  'showAfter': {
    default: 0,
    type: Number,
  },

  'showArrow': {
    default: true,
    type: Boolean,
  },
  'tabindex': dropdownProps.tabindex,
  'teleported': useTooltipContentProps.teleported,
  'title': String,
  'transition': useTooltipContentProps.transition,
  'trigger': useTooltipTriggerProps.trigger,
  'visible': useTooltipContentProps.visible,
  'width': {
    default: 150,
    type: [String, Number],
  },
} as const)
export type PopoverProps = ExtractPropTypes<typeof popoverProps>

export const popoverEmits = {
  'after-enter': () => true,
  'after-leave': () => true,
  'before-enter': () => true,
  'before-leave': () => true,
  'update:visible': (value: boolean) => isBoolean(value),
}
export type PopoverEmits = typeof popoverEmits

export type PopoverInstance = InstanceType<typeof Popover>

// @ts-nocheck
import { buildProps, definePropType, iconPropType } from '/@/utils'
import { EVENT_CODE } from '/@/constants'
import { createCollectionWithScope } from '/@/components/collection'
import {
  useTooltipContentProps,
  useTooltipTriggerProps,
} from '/@/components/tooltip'

import type { Options } from '@datadayrepos/popperts'
import type { ButtonProps, ButtonType } from '/@/components/button'
import type { Placement } from '/@/components/popper'
import type { ComponentInternalInstance, ComputedRef } from 'vue'
import type { Nullable } from '/@/utils'

export interface IElDropdownInstance {
  instance?: ComponentInternalInstance
  dropdownSize?: ComputedRef<string>
  handleClick?: () => void
  commandHandler?: (...arg) => void
  show?: () => void
  hide?: () => void
  trigger?: ComputedRef<string>
  hideOnClick?: ComputedRef<boolean>
  triggerElm?: ComputedRef<Nullable<HTMLButtonElement>>
}

export const dropdownProps = buildProps({
  buttonProps: {
    type: definePropType<ButtonProps>(Object),
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  effect: {
    ...useTooltipContentProps.effect,
    default: 'light',
  },
  hideOnClick: {
    default: true,
    type: Boolean,
  },
  hideTimeout: {
    default: 150,
    type: Number,
  },
  id: String,
  loop: {
    default: true,
    type: Boolean,
  },
  maxHeight: {
    default: '',
    type: definePropType<number | string>([Number, String]),
  },
  placement: {
    default: 'bottom',
    type: definePropType<Placement>(String),
  },
  popperClass: {
    default: '',
    type: String,
  },
  popperOptions: {
    default: () => ({}),
    type: definePropType<Partial<Options>>(Object),
  },
  role: {
    default: 'menu',
    type: String,
  },
  showTimeout: {
    default: 150,
    type: Number,
  },
  size: {
    default: '',
    type: String,
  },
  splitButton: Boolean,
  tabindex: {
    default: 0,
    type: definePropType<number | string>([Number, String]),
  },
  teleported: useTooltipContentProps.teleported,
  trigger: useTooltipTriggerProps.trigger,
  type: {
    type: definePropType<ButtonType>(String),
  },
} as const)

export const dropdownItemProps = buildProps({
  command: {
    default: () => ({}),
    type: [Object, String, Number],
  },
  disabled: Boolean,
  divided: Boolean,
  icon: {
    type: iconPropType,
  },
  textValue: String,
} as const)

export const dropdownMenuProps = buildProps({
  onKeydown: { type: definePropType<(e: KeyboardEvent) => void>(Function) },
})

export const FIRST_KEYS = [
  EVENT_CODE.down,
  EVENT_CODE.pageDown,
  EVENT_CODE.home,
]

export const LAST_KEYS = [EVENT_CODE.up, EVENT_CODE.pageUp, EVENT_CODE.end]

export const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS]

const {
  ElCollection,
  ElCollectionItem,
  COLLECTION_INJECTION_KEY,
  COLLECTION_ITEM_INJECTION_KEY,
} = createCollectionWithScope('Dropdown')

export {
  ElCollection,
  ElCollectionItem,
  COLLECTION_INJECTION_KEY as DROPDOWN_COLLECTION_INJECTION_KEY,
  COLLECTION_ITEM_INJECTION_KEY as DROPDOWN_COLLECTION_ITEM_INJECTION_KEY,
}

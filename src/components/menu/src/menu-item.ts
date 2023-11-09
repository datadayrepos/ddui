import { buildProps, definePropType, isString } from '/@/utils'

import type { ExtractPropTypes } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { MenuItemRegistered } from './types'

export const menuItemProps = buildProps({
  disabled: Boolean,
  index: {
    default: null,
    type: definePropType<string | null>([String, null]),
  },
  route: {
    type: definePropType<RouteLocationRaw>([String, Object]),
  },
} as const)
export type MenuItemProps = ExtractPropTypes<typeof menuItemProps>

export const menuItemEmits = {
  click: (item: MenuItemRegistered) =>
    isString(item.index) && Array.isArray(item.indexPath),
}
export type MenuItemEmits = typeof menuItemEmits

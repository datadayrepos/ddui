import { buildProps } from '/@/utils'

import type { ExtractPropTypes } from 'vue'
import type Popper from './popper.vue'

const effects = ['light', 'dark'] as const
const triggers = ['click', 'contextmenu', 'hover', 'focus'] as const

export const Effect = {
  DARK: 'dark',
  LIGHT: 'light',
} as const

export const roleTypes = [
  'dialog',
  'grid',
  'group',
  'listbox',
  'menu',
  'navigation',
  'tooltip',
  'tree',
] as const

export type PopperEffect = typeof effects[number]
export type PopperTrigger = typeof triggers[number]

export const popperProps = buildProps({
  role: {
    default: 'tooltip',
    type: String,
    values: roleTypes,
  },
} as const)

export type PopperProps = ExtractPropTypes<typeof popperProps>

export type PopperInstance = InstanceType<typeof Popper>

/** @deprecated use `popperProps` instead, and it will be deprecated in the next major version */
export const usePopperProps = popperProps

/** @deprecated use `PopperProps` instead, and it will be deprecated in the next major version */
export type UsePopperProps = PopperProps

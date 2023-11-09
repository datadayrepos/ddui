import { buildProps } from '/@/utils'
import { dialogEmits, dialogProps } from '/@/components/dialog'
import type { ExtractPropTypes } from 'vue'

export const drawerProps = buildProps({
  ...dialogProps,
  direction: {
    default: 'rtl',
    type: String,
    values: ['ltr', 'rtl', 'ttb', 'btt'],
  },
  headerAriaLevel: {
    default: '2',
    type: String,
  },
  modalFade: {
    default: true,
    type: Boolean,
  },
  size: {
    default: '30%',
    type: [String, Number],
  },
  withHeader: {
    default: true,
    type: Boolean,
  },
} as const)

export type DrawerProps = ExtractPropTypes<typeof drawerProps>

export const drawerEmits = dialogEmits

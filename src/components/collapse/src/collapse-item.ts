import { buildProps, definePropType, generateId } from '/@/utils'
import type { ExtractPropTypes } from 'vue'
import type { CollapseActiveName } from './collapse'

export const collapseItemProps = buildProps({
  disabled: Boolean,
  name: {
    default: () => generateId(),
    type: definePropType<CollapseActiveName>([String, Number]),
  },
  title: {
    default: '',
    type: String,
  },
} as const)
export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>

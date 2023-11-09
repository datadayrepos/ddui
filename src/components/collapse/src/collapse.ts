import {
  buildProps,
  definePropType,
  isNumber,
  isString,
  mutable,
} from '/@/utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '/@/constants'
import type { ExtractPropTypes } from 'vue'
import type { Arrayable } from '/@/utils'

export type CollapseActiveName = string | number
export type CollapseModelValue = Arrayable<CollapseActiveName>

export function emitChangeFn(value: CollapseModelValue) {
  return typeof isNumber(value) || isString(value) || Array.isArray(value)
}

export const collapseProps = buildProps({
  accordion: Boolean,
  modelValue: {
    default: () => mutable([] as const),
    type: definePropType<CollapseModelValue>([Array, String, Number]),
  },
} as const)
export type CollapseProps = ExtractPropTypes<typeof collapseProps>

export const collapseEmits = {
  [CHANGE_EVENT]: emitChangeFn,
  [UPDATE_MODEL_EVENT]: emitChangeFn,
}
export type CollapseEmits = typeof collapseEmits

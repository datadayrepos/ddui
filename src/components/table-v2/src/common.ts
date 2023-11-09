import { definePropType, mutable } from '/@/utils'

import type { CSSProperties } from 'vue'
import type { Column, KeyType } from './types'

export type AnyColumn = Column<any>

/**
 * @Note even though we can use `string[] | string` as the type but for
 * convenience here we only use `string` as the acceptable value here.
 */
export const classType = String

export const columns = {
  required: true,
  type: definePropType<AnyColumn[]>(Array),
} as const

export const column = {
  type: definePropType<AnyColumn>(Object),
} as const

export const fixedDataType = {
  type: definePropType<any[]>(Array),
} as const

export const dataType = {
  ...fixedDataType,
  required: true,
} as const

export const expandColumnKey = String

export const expandKeys = {
  default: () => mutable([]),
  type: definePropType<KeyType[]>(Array),
} as const

export const requiredNumber = {
  required: true,
  type: Number,
} as const

export const rowKey = {
  default: 'id',
  type: definePropType<KeyType>([String, Number, Symbol]),
} as const

/**
 * @note even though we can use `StyleValue` but that would be difficult for us to mapping them,
 * so we only use `CSSProperties` as the acceptable value here.
 */
export const styleType = {
  type: definePropType<CSSProperties>(Object),
}

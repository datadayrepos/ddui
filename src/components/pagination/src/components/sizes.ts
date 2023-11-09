import { buildProps, definePropType, mutable } from '/@/utils'
import { componentSizes } from '/@/constants'
import type { ExtractPropTypes } from 'vue'
import type Sizes from './sizes.vue'

export const paginationSizesProps = buildProps({
  disabled: Boolean,
  pageSize: {
    required: true,
    type: Number,
  },
  pageSizes: {
    default: () => mutable([10, 20, 30, 40, 50, 100] as const),
    type: definePropType<number[]>(Array),
  },
  popperClass: {
    type: String,
  },
  size: {
    type: String,
    values: componentSizes,
  },
  teleported: Boolean,
} as const)

export type PaginationSizesProps = ExtractPropTypes<typeof paginationSizesProps>

export type SizesInstance = InstanceType<typeof Sizes>

import { buildProps } from '/@/utils'
import type Total from './total.vue'
import type { ExtractPropTypes } from 'vue'

export const paginationTotalProps = buildProps({
  total: {
    default: 1000,
    type: Number,
  },
} as const)

export type PaginationTotalProps = ExtractPropTypes<typeof paginationTotalProps>

export type TotalInstance = InstanceType<typeof Total>

import { buildProps } from '/@/utils'
import type { ExtractPropTypes } from 'vue'
import type Pager from './pager.vue'

export const paginationPagerProps = buildProps({
  currentPage: {
    default: 1,
    type: Number,
  },
  disabled: Boolean,
  pageCount: {
    required: true,
    type: Number,
  },
  pagerCount: {
    default: 7,
    type: Number,
  },
} as const)

export type PaginationPagerProps = ExtractPropTypes<typeof paginationPagerProps>

export type PagerInstance = InstanceType<typeof Pager>

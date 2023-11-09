import { buildProps, iconPropType } from '/@/utils'
import type { ExtractPropTypes } from 'vue'
import type Next from './next.vue'

export const paginationNextProps = buildProps({
  currentPage: {
    default: 1,
    type: Number,
  },
  disabled: Boolean,
  nextIcon: {
    type: iconPropType,
  },
  nextText: {
    type: String,
  },
  pageCount: {
    default: 50,
    type: Number,
  },
} as const)

export type PaginationNextProps = ExtractPropTypes<typeof paginationNextProps>

export type NextInstance = InstanceType<typeof Next>

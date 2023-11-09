import { buildProps, iconPropType } from '/@/utils'
import type { ExtractPropTypes } from 'vue'
import type Prev from './prev.vue'

export const paginationPrevProps = buildProps({
  currentPage: {
    default: 1,
    type: Number,
  },
  disabled: Boolean,
  prevIcon: {
    type: iconPropType,
  },
  prevText: {
    type: String,
  },
} as const)

export const paginationPrevEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type PaginationPrevProps = ExtractPropTypes<typeof paginationPrevProps>

export type PrevInstance = InstanceType<typeof Prev>

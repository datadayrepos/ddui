import { buildProps } from '/@/utils'
import type { ExtractPropTypes } from 'vue'

export const carouselItemProps = buildProps({
  label: {
    default: '',
    type: [String, Number],
  },
  name: { default: '', type: String },
} as const)

export type CarouselItemProps = ExtractPropTypes<typeof carouselItemProps>

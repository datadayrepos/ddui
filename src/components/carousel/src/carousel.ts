import { buildProps, isNumber } from '/@/utils'
import type { ExtractPropTypes } from 'vue'

export const carouselProps = buildProps({
  arrow: {
    default: 'hover',
    type: String,
    values: ['always', 'hover', 'never'],
  },
  autoplay: {
    default: true,
    type: Boolean,
  },
  direction: {
    default: 'horizontal',
    type: String,
    values: ['horizontal', 'vertical'],
  },
  height: {
    default: '',
    type: String,
  },
  indicatorPosition: {
    default: '',
    type: String,
    values: ['', 'none', 'outside'],
  },
  initialIndex: {
    default: 0,
    type: Number,
  },
  interval: {
    default: 3000,
    type: Number,
  },
  loop: {
    default: true,
    type: Boolean,
  },
  pauseOnHover: {
    default: true,
    type: Boolean,
  },
  trigger: {
    default: 'hover',
    type: String,
    values: ['hover', 'click'],
  },
  type: {
    default: '',
    type: String,
    values: ['', 'card'],
  },
} as const)

export const carouselEmits = {
  change: (current: number, prev: number) => [current, prev].every(isNumber),
}

export type CarouselProps = ExtractPropTypes<typeof carouselProps>
export type CarouselEmits = typeof carouselEmits

import type { CSSProperties } from 'vue'
import type { ThumbProps } from './thumb'

export const GAP = 4 // top 2 + bottom 2 of bar instance

export const BAR_MAP = {
  horizontal: {
    axis: 'X',
    client: 'clientX',
    direction: 'left',
    key: 'horizontal',
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
  },
  vertical: {
    axis: 'Y',
    client: 'clientY',
    direction: 'top',
    key: 'vertical',
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
  },
} as const

export function renderThumbStyle({
  move,
  size,
  bar,
}: Pick<ThumbProps, 'move' | 'size'> & {
  bar: typeof BAR_MAP[keyof typeof BAR_MAP]
}): CSSProperties {
  return {
    [bar.size]: size,
    transform: `translate${bar.axis}(${move}%)`,
  }
}

import { computed } from 'vue'
import type { SliderProps } from '../slider'
import type { SliderMarkerProps } from '../marker'

export interface Mark extends SliderMarkerProps {
  point: number
  position: number
}

export function useMarks(props: SliderProps) {
  return computed(() => {
    if (!props.marks)
      return []

    const marksKeys = Object.keys(props.marks)
    return marksKeys
      .map(Number.parseFloat)
      .sort((a, b) => a - b)
      .filter(point => point <= props.max && point >= props.min)
      .map(
        (point): Mark => ({
          mark: props.marks![point],
          point,
          position: ((point - props.min) * 100) / (props.max - props.min),
        }),
      )
  })
}

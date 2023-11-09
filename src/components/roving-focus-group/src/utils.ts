import { EVENT_CODE } from '/@/constants'
import type { HTMLAttributes } from 'vue'

type Orientation = HTMLAttributes['aria-orientation']
type Direction = 'ltr' | 'rtl'
type FocusIntent = 'first' | 'last' | 'prev' | 'next'

const MAP_KEY_TO_FOCUS_INTENT: Record<string, FocusIntent> = {
  ArrowDown: 'next',
  ArrowLeft: 'prev',
  ArrowRight: 'next',
  ArrowUp: 'prev',
  End: 'last',
  Home: 'first',
  PageDown: 'last',
  PageUp: 'first',
}

function getDirectionAwareKey(key: string, dir?: Direction) {
  if (dir !== 'rtl')
    return key

  switch (key) {
    case EVENT_CODE.right:
      return EVENT_CODE.left
    case EVENT_CODE.left:
      return EVENT_CODE.right
    default:
      return key
  }
}

export function getFocusIntent(event: KeyboardEvent, orientation?: Orientation, dir?: Direction) {
  const key = getDirectionAwareKey(event.key, dir)
  if (
    orientation === 'vertical'
    && [EVENT_CODE.left, EVENT_CODE.right].includes(key)
  )
    return undefined
  if (
    orientation === 'horizontal'
    && [EVENT_CODE.up, EVENT_CODE.down].includes(key)
  )
    return undefined
  return MAP_KEY_TO_FOCUS_INTENT[key]
}

export function reorderArray<T>(array: T[], atIdx: number) {
  return array.map((_, idx) => array[(idx + atIdx) % array.length])
}

export function focusFirst(elements: HTMLElement[]) {
  const { activeElement: prevActive } = document

  for (const element of elements) {
    if (element === prevActive)
      return
    element.focus()
    if (prevActive !== document.activeElement)
      return
  }
}

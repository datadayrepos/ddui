import type { ComponentPublicInstance, Ref } from 'vue'
import { isFunction } from '../types'

export type RefSetter = (
  el: Element | ComponentPublicInstance | undefined
) => void

export function composeRefs(...refs: (Ref<HTMLElement | undefined> | RefSetter)[]) {
  return (el: Element | ComponentPublicInstance | null) => {
    refs.forEach((ref) => {
      if (isFunction(ref))
        ref(el as Element | ComponentPublicInstance)
      else
        ref.value = el as HTMLElement | undefined
    })
  }
}
// 2.4.2

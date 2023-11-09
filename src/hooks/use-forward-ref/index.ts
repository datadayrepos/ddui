import { provide } from 'vue'

import type { InjectionKey, ObjectDirective, Ref } from 'vue'

type ForwardRefSetter<T> = (el: T) => void // Make ForwardRefSetter generic

export interface ForwardRefInjectionContext<T> { // Make the context generic
  setForwardRef: ForwardRefSetter<T>
}

export const FORWARD_REF_INJECTION_KEY: InjectionKey<ForwardRefInjectionContext<any>> // Use any or a specific type
  = Symbol('elForwardRef')

export function useForwardRef<T>(forwardRef: Ref<T | null>) {
  const setForwardRef: ForwardRefSetter<T> = (el: T) => { // Explicitly declare the type here
    forwardRef.value = el
  }

  provide(FORWARD_REF_INJECTION_KEY, {
    setForwardRef,
  } as ForwardRefInjectionContext<T>) // Cast the provided value to the generic context
}

export function useForwardRefDirective<T>(setForwardRef: ForwardRefSetter<T>): ObjectDirective<T> {
  return {
    mounted(el: T) {
      setForwardRef(el)
    },
    unmounted() {
      setForwardRef(null as unknown as T) // Properly handle null assignment
    },
    updated(el: T) {
      setForwardRef(el)
    },
  }
}
// 2.4.2 type edits

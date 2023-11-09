import { computed, getCurrentInstance, inject, unref } from 'vue'
import type { InjectionKey, Ref } from 'vue'
import type { MaybeRef } from '@datadayrepos/usevueshared'
import { debugWarn, isClient } from '../../utils'
import { useGetDerivedNamespace } from '../use-namespace'

export interface ElIdInjectionContext {
  prefix: number
  current: number
}

const defaultIdInjection = {
  current: 0,
  prefix: Math.floor(Math.random() * 10000),
}

export const ID_INJECTION_KEY: InjectionKey<ElIdInjectionContext>
  = Symbol('elIdInjection')

export function useIdInjection(): ElIdInjectionContext {
  return getCurrentInstance()
    ? inject(ID_INJECTION_KEY, defaultIdInjection)
    : defaultIdInjection
}

export function useId(deterministicId?: MaybeRef<string>): Ref<string> {
  const idInjection = useIdInjection()
  if (!isClient && idInjection === defaultIdInjection) {
    debugWarn(
      'IdInjection',
      `Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
usage: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`,
    )
  }

  const namespace = useGetDerivedNamespace()
  const idRef = computed(
    () =>
      unref(deterministicId)
      || `${namespace.value}-id-${idInjection.prefix}-${idInjection.current++}`,
  )

  return idRef
}
// 2.4.2

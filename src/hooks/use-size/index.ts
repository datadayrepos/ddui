import { computed, inject, unref } from 'vue'
import { buildProp } from '/@/utils'
import type { InjectionKey, Ref } from 'vue'
import { componentSizes } from '../../constants'

import type { ComponentSize } from '../../constants'

export const useSizeProp = buildProp({
  required: false,
  type: String,
  values: componentSizes,
} as const)

export const useSizeProps = {
  size: useSizeProp,
}

export interface SizeContext {
  size: Ref<ComponentSize>
}

export const SIZE_INJECTION_KEY: InjectionKey<SizeContext> = Symbol('size')

export function useGlobalSize() {
  const injectedSize = inject(SIZE_INJECTION_KEY, {} as SizeContext)

  return computed<ComponentSize>(() => {
    return unref(injectedSize.size) || ''
  })
}
// 2.4.2

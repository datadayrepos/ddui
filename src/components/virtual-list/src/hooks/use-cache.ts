import { computed, getCurrentInstance } from 'vue'
import { memoize } from '@datadayrepos/lodashts'
import memoOne from 'memoize-one'

import type { VirtualizedProps } from '../props'

export function useCache() {
  const vm = getCurrentInstance()!

  const props = vm.proxy!.$props as VirtualizedProps

  return computed(() => {
    const _getItemStyleCache = (_: any, __: any, ___: any) => ({})
    return props.perfMode
      ? memoize(_getItemStyleCache)
      : memoOne(_getItemStyleCache)
  })
}

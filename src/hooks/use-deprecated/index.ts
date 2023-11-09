import { unref, watch } from 'vue'
import type { MaybeRef } from '@datadayrepos/usevueshared'
import { debugWarn } from '../../utils'

interface DeprecationParam {
  from: string
  replacement: string
  scope: string
  version: string
  ref: string
  type?: 'API' | 'Attribute' | 'Event' | 'Slot'
}

export function useDeprecated({ from, replacement, scope, version, ref, type = 'API' }: DeprecationParam, condition: MaybeRef<boolean>) {
  watch(
    () => unref(condition),
    (val) => {
      if (val) {
        debugWarn(
          scope,
          `[${type}] ${from} is about to be deprecated in version ${version}, please use ${replacement} instead.
For more detail, please visit: ${ref}
`,
        )
      }
    },
    {
      immediate: true,
    },
  )
}
// 2.4.2

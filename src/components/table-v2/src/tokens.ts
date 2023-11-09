import type { InjectionKey, Ref } from 'vue'
import type { UseNamespaceReturn } from '/@/hooks'
import type { KeyType } from './types'

export interface TableV2Context {
  isScrolling: Ref<boolean>
  hoveringRowKey: Ref<null | KeyType>
  isResetting: Ref<boolean>
  ns: UseNamespaceReturn
}

export const TableV2InjectionKey: InjectionKey<TableV2Context>
  = Symbol('tableV2')

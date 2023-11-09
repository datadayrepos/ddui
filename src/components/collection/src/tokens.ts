import type { Ref } from 'vue'

export type CollectionItem<T = Record<string, any>> = {
  ref: HTMLElement | null
} & T

export interface ElCollectionInjectionContext {
  itemMap: Map<HTMLElement, CollectionItem>
  getItems: <T>() => CollectionItem<T>[]
  collectionRef: Ref<HTMLElement | null>
}

export interface ElCollectionItemInjectionContext {
  collectionItemRef: Ref<HTMLElement | null>
}

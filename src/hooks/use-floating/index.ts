import { isRef, onMounted, ref, unref, watchEffect } from 'vue'
import { unrefElement } from '@datadayrepos/usevuecore'
import { isNil } from '@datadayrepos/lodashts'
import { arrow as arrowCore, computePosition } from '@floating-ui/dom'

import type { Ref, ToRefs } from 'vue'
import type {
  ComputePositionReturn,
  Middleware,
  Placement,
  SideObject,
  Strategy,
  VirtualElement,
} from '@floating-ui/dom'
import { buildProps, isClient, keysOf } from '../../utils'

export const useFloatingProps = buildProps({} as const)

export type UseFloatingProps = ToRefs<{
  middleware: Array<Middleware>
  placement: Placement
  strategy: Strategy
}>

type ElementRef = Parameters<typeof unrefElement>['0']

function unrefReference(elRef: ElementRef | Ref<VirtualElement | undefined>) {
  if (!isClient)
    return
  if (!elRef)
    return elRef
  const unrefEl = unrefElement(elRef as ElementRef)
  if (unrefEl)
    return unrefEl
  return isRef(elRef) ? unrefEl : (elRef as VirtualElement)
}

export function getPositionDataWithUnit<T extends Record<string, number>>(record: T | undefined, key: keyof T) {
  const value = record?.[key]
  return isNil(value) ? '' : `${value}px`
}

export function useFloating({
  middleware,
  placement,
  strategy,
}: UseFloatingProps) {
  const referenceRef = ref<HTMLElement | VirtualElement>()
  const contentRef = ref<HTMLElement>()
  const x = ref<number>()
  const y = ref<number>()
  const middlewareData = ref<ComputePositionReturn['middlewareData']>({})

  const states = {
    middlewareData,
    placement,
    strategy,
    x,
    y,
  } as const

  const update = async () => {
    if (!isClient)
      return

    const referenceEl = unrefReference(referenceRef)
    const contentEl = unrefElement(contentRef)
    if (!referenceEl || !contentEl)
      return

    const data = await computePosition(referenceEl, contentEl, {
      middleware: unref(middleware),
      placement: unref(placement),
      strategy: unref(strategy),
    })

    keysOf(states).forEach((key) => {
      states[key].value = data[key]
    })
  }

  onMounted(() => {
    watchEffect(() => {
      update()
    })
  })

  return {
    ...states,
    contentRef,
    referenceRef,
    update,
  }
}

export interface ArrowMiddlewareProps {
  arrowRef: Ref<HTMLElement | null | undefined>
  padding?: number | SideObject
}

export function arrowMiddleware({
  arrowRef,
  padding,
}: ArrowMiddlewareProps): Middleware {
  return {
    fn(args) {
      const arrowEl = unref(arrowRef)
      if (!arrowEl)
        return {}

      return arrowCore({
        element: arrowEl,
        padding,
      }).fn(args)
    },
    name: 'arrow',

    options: {
      element: arrowRef,
      padding,
    },
  }
}

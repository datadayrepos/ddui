import { computed, inject, onMounted, ref, unref, watch } from 'vue'
import { isUndefined } from '/@/utils'
import { usePopper } from '/@/hooks'
import type { Modifier } from '@datadayrepos/popperts'
import { POPPER_INJECTION_KEY } from '../constants'
import { buildPopperOptions, unwrapMeasurableEl } from '../utils'

import type { PartialOptions } from '/@/hooks'
import type { PopperContentProps } from '../content'

const DEFAULT_ARROW_OFFSET = 0

export function usePopperContent(props: PopperContentProps) {
  const { popperInstanceRef, contentRef, triggerRef, role } = inject(
    POPPER_INJECTION_KEY,
    undefined,
  )!

  const arrowRef = ref<HTMLElement>()
  const arrowOffset = ref<number>()

  const eventListenerModifier = computed(() => {
    return {
      enabled: !!props.visible,
      name: 'eventListeners',
    } as Modifier<'eventListeners', any>
  })

  const arrowModifier = computed(() => {
    const arrowEl = unref(arrowRef)
    const offset = unref(arrowOffset) ?? DEFAULT_ARROW_OFFSET
    // Seems like the `phase` and `fn` is required by Modifier type
    // But on its documentation they didn't specify that.
    // Refer to https://popper.js.org/docs/v2/modifiers/arrow/
    return {
      enabled: !isUndefined(arrowEl),
      name: 'arrow',
      options: {
        element: arrowEl,
        padding: offset,
      },
    } as any
  })

  const options = computed<PartialOptions>(() => {
    return {
      onFirstUpdate: () => {
        update()
      },
      ...buildPopperOptions(props, [
        unref(arrowModifier),
        unref(eventListenerModifier),
      ]),
    }
  })

  const computedReference = computed(
    () => unwrapMeasurableEl(props.referenceEl) || unref(triggerRef),
  )

  const { attributes, state, styles, update, forceUpdate, instanceRef }
    = usePopper(computedReference, contentRef, options)

  watch(instanceRef, instance => (popperInstanceRef.value = instance))

  onMounted(() => {
    watch(
      () => unref(computedReference)?.getBoundingClientRect(),
      () => {
        update()
      },
    )
  })

  return {
    arrowRef,
    attributes,
    contentRef,
    forceUpdate,
    instanceRef,
    role,
    state,

    styles,
    update,
  }
}

export type UsePopperContentReturn = ReturnType<typeof usePopperContent>

import { computed, onBeforeUnmount, ref, shallowRef, unref, watch } from 'vue'
import { createPopper } from '@datadayrepos/popperts'
import type { Ref } from 'vue'
import type {
  Instance,
  Modifier,
  Options,
  State,
  VirtualElement,
} from '@datadayrepos/popperts'
import { fromPairs } from '@datadayrepos/lodashts'

type ElementType = HTMLElement | undefined
type ReferenceElement = ElementType | VirtualElement
export type PartialOptions = Partial<Options>

export function usePopper(referenceElementRef: Ref<ReferenceElement>, popperElementRef: Ref<ElementType>, opts: Ref<PartialOptions> | PartialOptions = {} as PartialOptions) {
  const stateUpdater = {
    enabled: true,
    fn: ({ state }) => {
      const derivedState = deriveState(state)

      // eslint-disable-next-line ts/no-use-before-define
      Object.assign(states.value, derivedState)
    },
    name: 'updateState',
    phase: 'write',
    requires: ['computeStyles'],
  } as Modifier<'updateState', any>

  const options = computed<Options>(() => {
    const { onFirstUpdate, placement, strategy, modifiers } = unref(opts)

    return {
      modifiers: [
        ...(modifiers || []),
        stateUpdater,
        { enabled: false, name: 'applyStyles' },
      ],
      onFirstUpdate,
      placement: placement || 'bottom',
      strategy: strategy || 'absolute',
    }
  })

  const instanceRef = shallowRef<Instance | undefined>()
  const states = ref<Pick<State, 'styles' | 'attributes'>>({
    attributes: {},
    styles: {
      arrow: {
        position: 'absolute',
      },
      popper: {
        left: '0',
        position: unref(options).strategy,
        top: '0',
      },
    },
  })

  const destroy = () => {
    if (!instanceRef.value)
      return

    instanceRef.value.destroy()
    instanceRef.value = undefined
  }

  watch(
    options,
    (newOptions) => {
      const instance = unref(instanceRef)
      if (instance)
        instance.setOptions(newOptions)
    },
    {
      deep: true,
    },
  )

  watch(
    [referenceElementRef, popperElementRef],
    ([referenceElement, popperElement]) => {
      destroy()
      if (!referenceElement || !popperElement)
        return

      instanceRef.value = createPopper(
        referenceElement,
        popperElement,
        unref(options),
      )
    },
  )

  onBeforeUnmount(() => {
    destroy()
  })

  return {
    attributes: computed(() => unref(states).attributes),
    forceUpdate: () => unref(instanceRef)?.forceUpdate(),
    // Preventing end users from modifying the instance.
    instanceRef: computed(() => unref(instanceRef)),
    state: computed(() => ({ ...(unref(instanceRef)?.state || {}) })),
    styles: computed(() => unref(states).styles),
    update: () => unref(instanceRef)?.update(),
  }
}

function deriveState(state: State) {
  const elements = Object.keys(state.elements) as unknown as Array<
    keyof State['elements']
  >

  const styles = fromPairs(
    elements.map(
      element =>
        [element, state.styles[element] || {}] as [
          string,
          State['styles'][keyof State['styles']],
        ],
    ),
  )

  const attributes = fromPairs(
    elements.map(
      element =>
        [element, state.attributes[element]] as [
          string,
          State['attributes'][keyof State['attributes']],
        ],
    ),
  )

  return {
    attributes,
    styles,
  }
}

export type UsePopperReturn = ReturnType<typeof usePopper>
// 2.4.2

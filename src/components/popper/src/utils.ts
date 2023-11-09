import { unrefElement } from '@datadayrepos/usevuecore'
import { isClient } from '/@/utils'

import type { ComponentPublicInstance } from 'vue'
import type { MaybeRef } from '@datadayrepos/usevueshared'
import type { Modifier } from '@datadayrepos/popperts'
import type { Measurable } from './constants'
import type { PopperCoreConfigProps } from './content'

export function buildPopperOptions(props: PopperCoreConfigProps, modifiers: Modifier<any, any>[] = []) {
  const { placement, strategy, popperOptions } = props
  const options = {
    placement,
    strategy,
    ...popperOptions,
    modifiers: [...genModifiers(props), ...modifiers],
  }

  deriveExtraModifiers(options, popperOptions?.modifiers)
  return options
}

export function unwrapMeasurableEl($el: MaybeRef<Measurable | undefined | ComponentPublicInstance>) {
  if (!isClient)
    return
  return unrefElement($el as HTMLElement)
}

function genModifiers(options: PopperCoreConfigProps) {
  const { offset, gpuAcceleration, fallbackPlacements } = options
  return [
    {
      name: 'offset',
      options: {
        offset: [0, offset ?? 12],
      },
    },
    {
      name: 'preventOverflow',
      options: {
        padding: {
          bottom: 2,
          left: 5,
          right: 5,
          top: 2,
        },
      },
    },
    {
      name: 'flip',
      options: {
        fallbackPlacements,
        padding: 5,
      },
    },
    {
      name: 'computeStyles',
      options: {
        gpuAcceleration,
      },
    },
  ]
}

function deriveExtraModifiers(
  options: any,
  modifiers: PopperCoreConfigProps['popperOptions']['modifiers'],
) {
  if (modifiers)
    options.modifiers = [...options.modifiers, ...(modifiers ?? [])]
}

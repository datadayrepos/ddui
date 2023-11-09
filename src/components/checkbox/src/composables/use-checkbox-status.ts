import { computed, inject, ref, toRaw } from 'vue'
import { isEqual, isNil } from '@datadayrepos/lodashts'
import { useFormSize } from '/@/components/form'
import { isArray, isBoolean, isObject } from '/@/utils'
import type { ComponentInternalInstance } from 'vue'
import { checkboxGroupContextKey } from '../constants'

import type { CheckboxProps } from '../checkbox'
import type { CheckboxModel } from '../composables'

export function useCheckboxStatus(props: CheckboxProps, slots: ComponentInternalInstance['slots'], { model }: Pick<CheckboxModel, 'model'>) {
  const checkboxGroup = inject(checkboxGroupContextKey, undefined)
  const isFocused = ref(false)
  const isChecked = computed<boolean>(() => {
    const value = model.value
    if (isBoolean(value)) {
      return value
    }
    else if (isArray(value)) {
      if (isObject(props.label))
        return value.map(toRaw).some(o => isEqual(o, props.label))
      else
        return value.map(toRaw).includes(props.label)
    }
    else if (value !== null && value !== undefined) {
      return value === props.trueLabel
    }
    else {
      return !!value
    }
  })

  const checkboxButtonSize = useFormSize(
    computed(() => checkboxGroup?.size?.value),
    {
      prop: true,
    },
  )
  const checkboxSize = useFormSize(computed(() => checkboxGroup?.size?.value))

  const hasOwnLabel = computed<boolean>(() => {
    return !!slots.default || !isNil(props.label)
  })

  return {
    checkboxButtonSize,
    checkboxSize,
    hasOwnLabel,
    isChecked,
    isFocused,
  }
}

export type CheckboxStatus = ReturnType<typeof useCheckboxStatus>

import { computed, getCurrentInstance, inject, ref } from 'vue'
import { isArray, isUndefined } from '/@/utils'
import { UPDATE_MODEL_EVENT } from '/@/constants'
import { checkboxGroupContextKey } from '../constants'

import type { CheckboxProps } from '../checkbox'

export function useCheckboxModel(props: CheckboxProps) {
  const selfModel = ref<unknown>(false)
  const { emit } = getCurrentInstance()!
  const checkboxGroup = inject(checkboxGroupContextKey, undefined)
  const isGroup = computed(() => isUndefined(checkboxGroup) === false)
  const isLimitExceeded = ref(false)
  const model = computed({
    get() {
      return isGroup.value
        ? checkboxGroup?.modelValue?.value
        : props.modelValue ?? selfModel.value
    },

    set(val: unknown) {
      if (isGroup.value && isArray(val)) {
        isLimitExceeded.value
          = checkboxGroup?.max?.value !== undefined
          && val.length > checkboxGroup?.max.value
        isLimitExceeded.value === false && checkboxGroup?.changeEvent?.(val)
      }
      else {
        emit(UPDATE_MODEL_EVENT, val)
        selfModel.value = val
      }
    },
  })

  return {
    isGroup,
    isLimitExceeded,
    model,
  }
}

export type CheckboxModel = ReturnType<typeof useCheckboxModel>

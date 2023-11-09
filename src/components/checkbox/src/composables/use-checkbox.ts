import { useFormItem, useFormItemInputId } from '/@/components/form'
import { isArray } from '/@/utils'
import { useCheckboxDisabled } from './use-checkbox-disabled'
import { useCheckboxEvent } from './use-checkbox-event'
import { useCheckboxModel } from './use-checkbox-model'
import { useCheckboxStatus } from './use-checkbox-status'

import type { ComponentInternalInstance } from 'vue'
import type { CheckboxProps } from '../checkbox'
import type { CheckboxModel } from './use-checkbox-model'

function setStoreValue(props: CheckboxProps, { model }: Pick<CheckboxModel, 'model'>) {
  function addToStore() {
    if (isArray(model.value) && !model.value.includes(props.label))
      model.value.push(props.label)
    else
      model.value = props.trueLabel || true
  }
  props.checked && addToStore()
}

export function useCheckbox(props: CheckboxProps, slots: ComponentInternalInstance['slots']) {
  const { formItem: elFormItem } = useFormItem()
  const { model, isGroup, isLimitExceeded } = useCheckboxModel(props)
  const {
    isFocused,
    isChecked,
    checkboxButtonSize,
    checkboxSize,
    hasOwnLabel,
  } = useCheckboxStatus(props, slots, { model })
  const { isDisabled } = useCheckboxDisabled({ isChecked, model })
  const { inputId, isLabeledByFormItem } = useFormItemInputId(props, {
    disableIdGeneration: hasOwnLabel,
    disableIdManagement: isGroup,
    formItemContext: elFormItem,
  })
  const { handleChange, onClickRoot } = useCheckboxEvent(props, {
    hasOwnLabel,
    isDisabled,
    isLabeledByFormItem,
    isLimitExceeded,
    model,
  })

  setStoreValue(props, { model })

  return {
    checkboxButtonSize,
    checkboxSize,
    handleChange,
    hasOwnLabel,
    inputId,
    isChecked,
    isDisabled,
    isFocused,
    isLabeledByFormItem,
    model,
    onClickRoot,
  }
}

import { Text, computed, inject, ref, useSlots } from 'vue'
import {
  useFormDisabled,
  useFormItem,
  useFormSize,
} from '/@/components/form'
import { useGlobalConfig } from '/@/components/config-provider'
import { useDeprecated } from '/@/hooks'
import type { SetupContext } from 'vue'
import { buttonGroupContextKey } from './constants'

import type { ButtonEmits, ButtonProps } from './button'

export function useButton(props: ButtonProps, emit: SetupContext<ButtonEmits>['emit']) {
  useDeprecated(
    {
      from: 'type.text',
      ref: 'https://element-plus.org/en-US/component/button.html#button-attributes',
      replacement: 'link',
      scope: 'props',
      version: '3.0.0',
    },
    computed(() => props.type === 'text'),
  )

  const buttonGroupContext = inject(buttonGroupContextKey, undefined)
  const globalConfig = useGlobalConfig('button')
  const { form } = useFormItem()
  const _size = useFormSize(computed(() => buttonGroupContext?.size))
  const _disabled = useFormDisabled()
  const _ref = ref<HTMLButtonElement>()
  const slots = useSlots()

  const _type = computed(() => props.type || buttonGroupContext?.type || '')
  const autoInsertSpace = computed(
    () => props.autoInsertSpace ?? globalConfig.value?.autoInsertSpace ?? false,
  )

  const _props = computed(() => {
    if (props.tag === 'button') {
      return {
        ariaDisabled: _disabled.value || props.loading,
        autofocus: props.autofocus,
        disabled: _disabled.value || props.loading,
        type: props.nativeType,
      }
    }
    return {}
  })

  // add space between two characters in Chinese
  const shouldAddSpace = computed(() => {
    const defaultSlot = slots.default?.()
    if (autoInsertSpace.value && defaultSlot?.length === 1) {
      const slot = defaultSlot[0]
      if (slot?.type === Text) {
        const text = slot.children as string
        return /^\p{Unified_Ideograph}{2}$/u.test(text.trim())
      }
    }
    return false
  })

  const handleClick = (evt: MouseEvent) => {
    if (props.nativeType === 'reset')
      form?.resetFields()

    emit('click', evt)
  }

  return {
    _disabled,
    _props,
    _ref,
    _size,
    _type,
    handleClick,
    shouldAddSpace,
  }
}

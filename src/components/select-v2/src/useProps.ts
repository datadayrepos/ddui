import { computed } from 'vue'
import { get } from '@datadayrepos/lodashts'

import type { ISelectProps } from './token'
import type { Option } from './select.types'

export interface Props {
  label?: string
  value?: string
  disabled?: string
  options?: string
}

export const defaultProps: Required<Props> = {
  disabled: 'disabled',
  label: 'label',
  options: 'options',
  value: 'value',
}

export function useProps(props: Pick<ISelectProps, 'props'>) {
  const aliasProps = computed(() => ({ ...defaultProps, ...props.props as Props }))

  const getLabel = (option: Option) => get(option, aliasProps.value.label)
  const getValue = (option: Option) => get(option, aliasProps.value.value)
  const getDisabled = (option: Option) => get(option, aliasProps.value.disabled)
  const getOptions = (option: Option) => get(option, aliasProps.value.options)

  return {
    aliasProps,
    getDisabled,
    getLabel,
    getOptions,
    getValue,
  }
}

import { computed } from 'vue'

import type { TransferPropsAlias } from '../transfer'

export function usePropsAlias(props: { props: TransferPropsAlias }) {
  const initProps: Required<TransferPropsAlias> = {
    disabled: 'disabled',
    key: 'key',
    label: 'label',
  }

  return computed(() => ({
    ...initProps,
    ...props.props,
  }))
}

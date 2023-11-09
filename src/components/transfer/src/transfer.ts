import { isNil } from '@datadayrepos/lodashts'
import {
  buildProps,
  definePropType,
  isArray,
  mutable,
} from '/@/utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '/@/constants'

import type { ExtractPropTypes, h as H, VNode } from 'vue'
import type Transfer from './transfer.vue'

export type TransferKey = string | number
export type TransferDirection = 'left' | 'right'

export type TransferDataItem = Record<string, any>

export type renderContent = (
  h: typeof H,
  option: TransferDataItem
) => VNode | VNode[]

export interface TransferFormat {
  noChecked?: string
  hasChecked?: string
}

export interface TransferPropsAlias {
  label?: string
  key?: string
  disabled?: string
}

export interface TransferCheckedState {
  leftChecked: TransferKey[]
  rightChecked: TransferKey[]
}

export const LEFT_CHECK_CHANGE_EVENT = 'left-check-change'
export const RIGHT_CHECK_CHANGE_EVENT = 'right-check-change'

export const transferProps = buildProps({
  /**
   * @description custom button texts
   */
  buttonTexts: {
    default: () => [],
    type: definePropType<[string, string]>(Array),
  },
  /**
   * @description data source
   */
  data: {
    default: () => [],
    type: definePropType<TransferDataItem[]>(Array),
  },
  /**
   * @description custom filter method
   */
  filterMethod: {
    type: definePropType<(query: string, item: TransferDataItem) => boolean>(
      Function,
    ),
  },
  /**
   * @description placeholder for the filter input
   */
  filterPlaceholder: String,
  /**
   * @description whether Transfer is filterable
   */
  filterable: Boolean,
  /**
   * @description texts for checking status in list header
   */
  format: {
    default: () => ({}),
    type: definePropType<TransferFormat>(Object),
  },
  /**
   * @description key array of initially checked data items of the left list
   */
  leftDefaultChecked: {
    default: () => [],
    type: definePropType<TransferKey[]>(Array),
  },
  /**
   * @description binding value
   */
  modelValue: {
    default: () => [],
    type: definePropType<TransferKey[]>(Array),
  },
  /**
   * @description prop aliases for data source
   */
  props: {
    default: () =>
      mutable({
        disabled: 'disabled',
        key: 'key',
        label: 'label',
      } as const),
    type: definePropType<TransferPropsAlias>(Object),
  },
  /**
   * @description custom render function for data items
   */
  renderContent: {
    type: definePropType<renderContent>(Function),
  },
  /**
   * @description key array of initially checked data items of the right list
   */
  rightDefaultChecked: {
    default: () => [],
    type: definePropType<TransferKey[]>(Array),
  },
  /**
   * @description order strategy for elements in the target list. If set to `original`, the elements will keep the same order as the data source. If set to `push`, the newly added elements will be pushed to the bottom. If set to `unshift`, the newly added elements will be inserted on the top
   */
  targetOrder: {
    default: 'original',
    type: String,
    values: ['original', 'push', 'unshift'],
  },
  /**
   * @description custom list titles
   */
  titles: {
    default: () => [],
    type: definePropType<[string, string]>(Array),
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    default: true,
    type: Boolean,
  },
} as const)
export type TransferProps = ExtractPropTypes<typeof transferProps>

export function transferCheckedChangeFn(value: TransferKey[], movedKeys?: TransferKey[]) {
  return [value, movedKeys].every(isArray) || (isArray(value) && isNil(movedKeys))
}

export const transferEmits = {
  [CHANGE_EVENT]: (
    value: TransferKey[],
    direction: TransferDirection,
    movedKeys: TransferKey[],
  ) =>
    [value, movedKeys].every(isArray) && ['left', 'right'].includes(direction),
  [LEFT_CHECK_CHANGE_EVENT]: transferCheckedChangeFn,
  [RIGHT_CHECK_CHANGE_EVENT]: transferCheckedChangeFn,
  [UPDATE_MODEL_EVENT]: (value: TransferKey[]) => isArray(value),
}
export type TransferEmits = typeof transferEmits

export type TransferInstance = InstanceType<typeof Transfer>

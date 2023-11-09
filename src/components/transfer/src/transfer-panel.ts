import { buildProps, definePropType } from '/@/utils'
import { transferCheckedChangeFn, transferProps } from './transfer'

import type { ExtractPropTypes, VNode } from 'vue'
import type { TransferDataItem, TransferKey } from './transfer'
import type TransferPanel from './transfer-panel.vue'

export interface TransferPanelState {
  checked: TransferKey[]
  allChecked: boolean
  query: string
  checkChangeByUser: boolean
}

export const CHECKED_CHANGE_EVENT = 'checked-change'

export const transferPanelProps = buildProps({
  data: transferProps.data,
  defaultChecked: transferProps.leftDefaultChecked,
  filterMethod: transferProps.filterMethod,
  filterable: Boolean,
  format: transferProps.format,
  optionRender: {
    type: definePropType<(option: TransferDataItem) => VNode | VNode[]>(
      Function,
    ),
  },
  placeholder: String,
  props: transferProps.props,
  title: String,
} as const)
export type TransferPanelProps = ExtractPropTypes<typeof transferPanelProps>

export const transferPanelEmits = {
  [CHECKED_CHANGE_EVENT]: transferCheckedChangeFn,
}
export type TransferPanelEmits = typeof transferPanelEmits

export type TransferPanelInstance = InstanceType<typeof TransferPanel>

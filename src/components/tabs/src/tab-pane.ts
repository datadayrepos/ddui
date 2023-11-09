import { buildProps } from '/@/utils'
import type { ExtractPropTypes } from 'vue'
import type TabPane from './tab-pane.vue'

export const tabPaneProps = buildProps({
  closable: Boolean,
  disabled: Boolean,
  label: {
    default: '',
    type: String,
  },
  lazy: Boolean,
  name: {
    type: [String, Number],
  },
} as const)

export type TabPaneProps = ExtractPropTypes<typeof tabPaneProps>

export type TabPaneInstance = InstanceType<typeof TabPane>

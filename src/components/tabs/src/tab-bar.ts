import { buildProps, definePropType, mutable } from '/@/utils'
import type { ExtractPropTypes } from 'vue'
import type { TabsPaneContext } from './constants'
import type TabBar from './tab-bar.vue'

export const tabBarProps = buildProps({
  tabs: {
    default: () => mutable([] as const),
    type: definePropType<TabsPaneContext[]>(Array),
  },
} as const)

export type TabBarProps = ExtractPropTypes<typeof tabBarProps>
export type TabBarInstance = InstanceType<typeof TabBar>

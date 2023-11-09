import { buildProps, definePropType } from '/@/utils'
import type { ExtractPropTypes, StyleValue } from 'vue'
import type Teleport from './teleport.vue'

export const teleportProps = buildProps({
  container: {
    default: 'body',
    type: definePropType<string>(String),
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  style: {
    type: definePropType<StyleValue>([String, Array, Object]),
  },
  zIndex: {
    default: '2000',
    type: String,
  },
} as const)

export type TeleportProps = ExtractPropTypes<typeof teleportProps>
export type TeleportInstance = InstanceType<typeof Teleport>

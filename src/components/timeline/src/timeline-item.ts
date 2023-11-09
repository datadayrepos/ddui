import { buildProps, iconPropType } from '/@/utils'
import type { ExtractPropTypes } from 'vue'
import type TimelineItem from './timeline-item.vue'

export const timelineItemProps = buildProps({
  /**
   * @description whether vertically centered
   */
  center: {
    default: false,
    type: Boolean,
  },
  /**
   * @description background color of node
   */
  color: {
    default: '',
    type: String,
  },
  /**
   * @description whether to show timestamp
   */
  hideTimestamp: {
    default: false,
    type: Boolean,
  },
  /**
   * @description icon is hollow
   */
  hollow: {
    default: false,
    type: Boolean,
  },
  /**
   * @description icon component
   */
  icon: {
    type: iconPropType,
  },
  /**
   * @description position of timestamp
   */
  placement: {
    default: 'bottom',
    type: String,
    values: ['top', 'bottom'],
  },
  /**
   * @description node size
   */
  size: {
    default: 'normal',
    type: String,
    values: ['normal', 'large'],
  },
  /**
   * @description timestamp content
   */
  timestamp: {
    default: '',
    type: String,
  },
  /**
   * @description node type
   */
  type: {
    default: '',
    type: String,
    values: ['primary', 'success', 'warning', 'danger', 'info'],
  },
} as const)
export type TimelineItemProps = ExtractPropTypes<typeof timelineItemProps>

export type TimelineItemInstance = InstanceType<typeof TimelineItem>

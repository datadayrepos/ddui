import { buildProps, definePropType, iconPropType } from '/@/utils'

import type { ExtractPropTypes, VNode } from 'vue'
import type Notification from './notification.vue'

export const notificationTypes = [
  'success',
  'info',
  'warning',
  'error',
] as const

export const notificationProps = buildProps({
  /**
   * @description custom class name for Notification
   */
  customClass: {
    default: '',
    type: String,
  },
  /**
   * @description whether `message` is treated as HTML string
   */
  dangerouslyUseHTMLString: {
    default: false,
    type: Boolean,
  },
  /**
   * @description duration before close. It will not automatically close if set 0
   */
  duration: {
    default: 4500,
    type: Number,
  },
  /**
   * @description custom icon component. It will be overridden by `type`
   */
  icon: {
    type: iconPropType,
  },
  /**
   * @description notification dom id
   */
  id: {
    default: '',
    type: String,
  },
  /**
   * @description description text
   */
  message: {
    default: '',
    type: definePropType<string | VNode>([String, Object]),
  },
  /**
   * @description offset from the top edge of the screen. Every Notification instance of the same moment should have the same offset
   */
  offset: {
    default: 0,
    type: Number,
  },
  /**
   * @description callback function when notification clicked
   */
  onClick: {
    default: () => undefined,
    type: definePropType<() => void>(Function),
  },
  /**
   * @description callback function when closed
   */
  onClose: {
    required: true,
    type: definePropType<() => void>(Function),
  },
  /**
   * @description custom position
   */
  position: {
    default: 'top-right',
    type: String,
    values: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
  },
  /**
   * @description whether to show a close button
   */
  showClose: {
    default: true,
    type: Boolean,
  },
  /**
   * @description title
   */
  title: {
    default: '',
    type: String,
  },
  /**
   * @description notification type
   */
  type: {
    default: '',
    type: String,
    values: [...notificationTypes, ''],
  },
  /**
   * @description initial zIndex
   */
  zIndex: Number,
} as const)
export type NotificationProps = ExtractPropTypes<typeof notificationProps>

export const notificationEmits = {
  destroy: () => true,
}
export type NotificationEmits = typeof notificationEmits

export type NotificationInstance = InstanceType<typeof Notification>

export type NotificationOptions = Omit<NotificationProps, 'id'> & {
  /**
   * @description set the root element for the notification, default to `document.body`
   */
  appendTo?: HTMLElement | string
}
export type NotificationOptionsTyped = Omit<NotificationOptions, 'type'>

export interface NotificationHandle {
  close: () => void
}

export type NotificationParams = Partial<NotificationOptions> | string | VNode
export type NotificationParamsTyped =
  | Partial<NotificationOptionsTyped>
  | string
  | VNode

export type NotifyFn = ((
  options?: NotificationParams
) => NotificationHandle) & { closeAll: () => void }

export type NotifyTypedFn = (
  options?: NotificationParamsTyped
) => NotificationHandle

export interface Notify extends NotifyFn {
  success: NotifyTypedFn
  warning: NotifyTypedFn
  error: NotifyTypedFn
  info: NotifyTypedFn
}

export interface NotificationQueueItem {
  vm: VNode
}

export type NotificationQueue = NotificationQueueItem[]

import {
  buildProps,
  definePropType,
  iconPropType,
  isClient,
  mutable,
} from '/@/utils'
import type { AppContext, ExtractPropTypes, VNode } from 'vue'
import type { Mutable } from '/@/utils'
import type MessageConstructor from './message.vue'

export const messageTypes = ['success', 'info', 'warning', 'error'] as const

export type messageType = typeof messageTypes[number]

export interface MessageConfigContext {
  max?: number
}

export const messageDefaults = mutable({
  appendTo: isClient ? document.body : (undefined as never),
  center: false,
  customClass: '',
  dangerouslyUseHTMLString: false,
  duration: 3000,
  grouping: false,
  icon: undefined,
  id: '',
  message: '',
  offset: 16,
  onClose: undefined,
  repeatNum: 1,
  showClose: false,
  type: 'info',
  zIndex: 0,
} as const)

export const messageProps = buildProps({
  /**
   * @description whether to center the text
   */
  center: {
    default: messageDefaults.center,
    type: Boolean,
  },
  /**
   * @description custom class name for Message
   */
  customClass: {
    default: messageDefaults.customClass,
    type: String,
  },
  /**
   * @description whether `message` is treated as HTML string
   */
  dangerouslyUseHTMLString: {
    default: messageDefaults.dangerouslyUseHTMLString,
    type: Boolean,
  },
  /**
   * @description display duration, millisecond. If set to 0, it will not turn off automatically
   */
  duration: {
    default: messageDefaults.duration,
    type: Number,
  },
  /**
   * @description merge messages with the same content, type of VNode message is not supported
   */
  grouping: {
    default: messageDefaults.grouping,
    type: Boolean,
  },
  /**
   * @description custom icon component, overrides `type`
   */
  icon: {
    default: messageDefaults.icon,
    type: iconPropType,
  },
  /**
   * @description message dom id
   */
  id: {
    default: messageDefaults.id,
    type: String,
  },
  /**
   * @description message text
   */
  message: {
    default: messageDefaults.message,
    type: definePropType<string | VNode | (() => VNode)>([
      String,
      Object,
      Function,
    ]),
  },
  /**
   * @description set the distance to the top of viewport
   */
  offset: {
    default: messageDefaults.offset,
    type: Number,
  },
  /**
   * @description callback function when closed with the message instance as the parameter
   */
  onClose: {
    required: false,
    type: definePropType<() => void>(Function),
  },
  /**
   * @description The number of repetitions, similar to badge, is used as the initial number when used with `grouping`
   */
  repeatNum: {
    default: messageDefaults.repeatNum,
    type: Number,
  },
  /**
   * @description whether to show a close button
   */
  showClose: {
    default: messageDefaults.showClose,
    type: Boolean,
  },
  /**
   * @description message type
   */
  type: {
    default: messageDefaults.type,
    type: String,
    values: messageTypes,
  },
  /**
   * @description input box size
   */
  zIndex: {
    default: messageDefaults.zIndex,
    type: Number,
  },
} as const)
export type MessageProps = ExtractPropTypes<typeof messageProps>

export const messageEmits = {
  destroy: () => true,
}
export type MessageEmits = typeof messageEmits

export type MessageInstance = InstanceType<typeof MessageConstructor>

export type MessageOptions = Partial<
  Mutable<
    Omit<MessageProps, 'id'> & {
      appendTo?: HTMLElement | string
    }
  >
>
export type MessageParams = MessageOptions | MessageOptions['message']
export type MessageParamsNormalized = Omit<MessageProps, 'id'> & {
  /**
   * @description set the root element for the message, default to `document.body`
   */
  appendTo: HTMLElement
}
export type MessageOptionsWithType = Omit<MessageOptions, 'type'>
export type MessageParamsWithType =
  | MessageOptionsWithType
  | MessageOptions['message']

export interface MessageHandler {
  /**
   * @description close the Message
   */
  close: () => void
}

export interface MessageFn {
  (options?: MessageParams, appContext?: null | AppContext): MessageHandler
  closeAll(type?: messageType): void
}
export type MessageTypedFn = (
  options?: MessageParamsWithType,
  appContext?: null | AppContext
) => MessageHandler

export interface Message extends MessageFn {
  success: MessageTypedFn
  warning: MessageTypedFn
  info: MessageTypedFn
  error: MessageTypedFn
}

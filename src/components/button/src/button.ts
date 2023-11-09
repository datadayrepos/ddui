import { useSizeProp } from '/@/hooks'
import { buildProps, definePropType, iconPropType } from '/@/utils'
import { Loading } from '@element-plus/icons-vue'
import type { Component, ExtractPropTypes } from 'vue'

export const buttonTypes = [
  'default',
  'primary',
  'success',
  'warning',
  'info',
  'danger',
  /**
   * @deprecated
   * Text type will be deprecated in the next major version (3.0.0)
   */
  'text',
  '',
] as const
export const buttonNativeTypes = ['button', 'submit', 'reset'] as const

export const buttonProps = buildProps({
  /**
   * @description automatically insert a space between two chinese characters
   */
  autoInsertSpace: {
    default: undefined,
    type: Boolean,
  },
  /**
   * @description native button autofocus
   */
  autofocus: Boolean,
  /**
   * @description determine whether the text button background color is always on
   */
  bg: Boolean,
  /**
   * @description determine whether it's a circle button
   */
  circle: Boolean,
  /**
   * @description custom button color, automatically calculate `hover` and `active` color
   */
  color: String,
  /**
   * @description dark mode, which automatically converts `color` to dark mode colors
   */
  dark: Boolean,
  /**
   * @description disable the button
   */
  disabled: Boolean,
  /**
   * @description icon component
   */
  icon: {
    type: iconPropType,
  },
  /**
   * @description determine whether it's a link button
   */
  link: Boolean,
  /**
   * @description determine whether it's loading
   */
  loading: Boolean,
  /**
   * @description customize loading icon component
   */
  loadingIcon: {
    default: () => Loading,
    type: iconPropType,
  },
  /**
   * @description native button type
   */
  nativeType: {
    default: 'button',
    type: String,
    values: buttonNativeTypes,
  },
  /**
   * @description determine whether it's a plain button
   */
  plain: Boolean,
  /**
   * @description determine whether it's a round button
   */
  round: Boolean,
  /**
   * @description button size
   */
  size: useSizeProp,
  /**
   * @description custom element tag
   */
  tag: {
    default: 'button',
    type: definePropType<string | Component>([String, Object]),
  },
  /**
   * @description determine whether it's a text button
   */
  text: Boolean,
  /**
   * @description button type
   */
  type: {
    default: '',
    type: String,
    values: buttonTypes,
  },
} as const)
export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits

export type ButtonType = ButtonProps['type']
export type ButtonNativeType = ButtonProps['nativeType']

export interface ButtonConfigContext {
  autoInsertSpace?: boolean
}

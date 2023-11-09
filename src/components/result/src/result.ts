import { buildProps } from '/@/utils'
import {
  CircleCheckFilled,
  CircleCloseFilled,
  InfoFilled,
  WarningFilled,
} from '@element-plus/icons-vue'
import type { Component, ExtractPropTypes } from 'vue'
import type Result from './result.vue'

export const IconMap = {
  error: 'icon-error',
  info: 'icon-info',
  success: 'icon-success',
  warning: 'icon-warning',
} as const

export const IconComponentMap: Record<
  typeof IconMap[keyof typeof IconMap],
  Component
> = {
  [IconMap.success]: CircleCheckFilled,
  [IconMap.warning]: WarningFilled,
  [IconMap.error]: CircleCloseFilled,
  [IconMap.info]: InfoFilled,
}

export const resultProps = buildProps({
  /**
   * @description icon type of result
   */
  icon: {
    default: 'info',
    type: String,
    values: ['success', 'warning', 'info', 'error'],
  },
  /**
   * @description sub title of result
   */
  subTitle: {
    default: '',
    type: String,
  },
  /**
   * @description title of result
   */
  title: {
    default: '',
    type: String,
  },
} as const)

export type ResultProps = ExtractPropTypes<typeof resultProps>

export type ResultInstance = InstanceType<typeof Result>

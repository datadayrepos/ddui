import type { Component } from 'vue'
import {
  CircleCheck,
  CircleClose,
  CircleCloseFilled,
  Close,
  InfoFilled,
  Loading,
  SuccessFilled,
  WarningFilled,
} from '@element-plus/icons-vue'
import { definePropType } from './props'

export const iconPropType = definePropType<string | Component>([
  String,
  Object,
  Function,
])

export const CloseComponents = {
  Close,
}

export const TypeComponents = {
  CircleCloseFilled,
  Close,
  InfoFilled,
  SuccessFilled,
  WarningFilled,
}

export const TypeComponentsMap = {
  error: CircleCloseFilled,
  info: InfoFilled,
  success: SuccessFilled,
  warning: WarningFilled,
}

export const ValidateComponentsMap = {
  error: CircleClose,
  success: CircleCheck,
  validating: Loading,
}
// 2.4.2

import { buttonTypes } from '/@/components/button'
import { QuestionFilled } from '@element-plus/icons-vue'
import { buildProps, iconPropType } from '/@/utils'
import { useTooltipContentProps } from '/@/components/tooltip'
import type { ExtractPropTypes } from 'vue'
import type Popconfirm from './popconfirm.vue'

export const popconfirmProps = buildProps({
  /**
   * @description Cancel button text
   */
  cancelButtonText: String,
  /**
   * @description Cancel button type
   */
  cancelButtonType: {
    default: 'text',
    type: String,
    values: buttonTypes,
  },
  /**
   * @description Confirm button text
   */
  confirmButtonText: String,
  /**
   * @description Confirm button type
   */
  confirmButtonType: {
    default: 'primary',
    type: String,
    values: buttonTypes,
  },
  /**
   * @description delay of disappear, in millisecond
   */
  hideAfter: {
    default: 200,
    type: Number,
  },
  /**
   * @description is hide Icon
   */
  hideIcon: {
    default: false,
    type: Boolean,
  },
  /**
   * @description Icon Component
   */
  icon: {
    default: () => QuestionFilled,
    type: iconPropType,
  },
  /**
   * @description Icon color
   */
  iconColor: {
    default: '#f90',
    type: String,
  },
  /**
   * @description when popconfirm inactive and `persistent` is `false` , popconfirm will be destroyed
   */
  persistent: useTooltipContentProps.persistent,
  /**
   * @description whether popconfirm is teleported to the body
   */
  teleported: useTooltipContentProps.teleported,
  /**
   * @description Title
   */
  title: String,
  /**
   * @description popconfirm width, min width 150px
   */
  width: {
    default: 150,
    type: [String, Number],
  },
} as const)

export const popconfirmEmits = {
  /**
   * @description triggers when click cancel button
   */
  cancel: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * @description triggers when click confirm button
   */
  confirm: (e: MouseEvent) => e instanceof MouseEvent,
}

export type PopconfirmEmits = typeof popconfirmEmits

export type PopconfirmProps = ExtractPropTypes<typeof popconfirmProps>

export type PopconfirmInstance = InstanceType<typeof Popconfirm>

import { buildProps, definePropType, isBoolean } from '/@/utils'
import { UPDATE_MODEL_EVENT } from '/@/constants'
import { dialogContentProps } from './dialog-content'

import type { ExtractPropTypes } from 'vue'

type DoneFn = (cancel?: boolean) => void
export type DialogBeforeCloseFn = (done: DoneFn) => void

export const dialogProps = buildProps({
  ...dialogContentProps,
  /**
   * @description whether to append Dialog itself to body. A nested Dialog should have this attribute set to `true`
   */
  appendToBody: Boolean,
  /**
   * @description callback before Dialog closes, and it will prevent Dialog from closing, use done to close the dialog
   */
  beforeClose: {
    type: definePropType<DialogBeforeCloseFn>(Function),
  },
  /**
   * @description the Time(milliseconds) before close
   */
  closeDelay: {
    default: 0,
    type: Number,
  },
  /**
   * @description whether the Dialog can be closed by clicking the mask
   */
  closeOnClickModal: {
    default: true,
    type: Boolean,
  },
  /**
   * @description whether the Dialog can be closed by pressing ESC
   */
  closeOnPressEscape: {
    default: true,
    type: Boolean,
  },
  /**
   * @description destroy elements in Dialog when closed
   */
  destroyOnClose: Boolean,
  /**
   * @description header's aria-level attribute
   */
  headerAriaLevel: {
    default: '2',
    type: String,
  },
  /**
   * @description whether scroll of body is disabled while Dialog is displayed
   */
  lockScroll: {
    default: true,
    type: Boolean,
  },
  /**
   * @description whether a mask is displayed
   */
  modal: {
    default: true,
    type: Boolean,
  },
  /**
   * @description custom class names for mask
   */
  modalClass: String,
  /**
   * @description visibility of Dialog
   */
  modelValue: Boolean,
  /**
   * @description the Time(milliseconds) before open
   */
  openDelay: {
    default: 0,
    type: Number,
  },
  /**
   * @description value for `margin-top` of Dialog CSS, default is 15vh
   */
  top: {
    type: String,
  },
  trapFocus: {
    default: false,
    type: Boolean,
  },
  /**
   * @description width of Dialog, default is 50%
   */
  width: {
    type: [String, Number],
  },
  /**
   * @description same as z-index in native CSS, z-order of dialog
   */
  zIndex: {
    type: Number,
  },
} as const)

export type DialogProps = ExtractPropTypes<typeof dialogProps>

export const dialogEmits = {
  [UPDATE_MODEL_EVENT]: (value: boolean) => isBoolean(value),
  close: () => true,
  closeAutoFocus: () => true,
  closed: () => true,
  open: () => true,
  openAutoFocus: () => true,
  opened: () => true,
}
export type DialogEmits = typeof dialogEmits

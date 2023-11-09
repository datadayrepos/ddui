import type { ExtractPropTypes } from 'vue'

export const backtopProps = {
  /**
   * @description bottom distance.
   */
  bottom: {
    default: 40,
    type: Number,
  },
  /**
   * @description right distance.
   */
  right: {
    default: 40,
    type: Number,
  },
  /**
   * @description the target to trigger scroll.
   */
  target: {
    default: '',
    type: String,
  },
  /**
   * @description the button will not show until the scroll height reaches this value.
   */
  visibilityHeight: {
    default: 200,
    type: Number,
  },
} as const
export type BacktopProps = ExtractPropTypes<typeof backtopProps>

export const backtopEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}
export type BacktopEmits = typeof backtopEmits

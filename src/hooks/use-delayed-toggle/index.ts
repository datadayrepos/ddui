import { unref } from 'vue'
import type { ExtractPropTypes, ToRefs } from 'vue'
import { buildProps, isNumber } from '../../utils'
import { useTimeout } from '../use-timeout'

export const useDelayedToggleProps = buildProps({
  /**
   * @description disappear automatically, in millisecond
   */
  autoClose: {
    default: 0,
    type: Number,
  },
  /**
   * @description delay of disappear, in millisecond
   */
  hideAfter: {
    default: 200,
    type: Number,
  },
  /**
   * @description delay of appearance, in millisecond
   */
  showAfter: {
    default: 0,
    type: Number,
  },
} as const)

export type UseDelayedToggleProps = {
  open: (event?: Event) => void
  close: (event?: Event) => void
} & ToRefs<ExtractPropTypes<typeof useDelayedToggleProps>>

export function useDelayedToggle({
  showAfter,
  hideAfter,
  autoClose,
  open,
  close,
}: UseDelayedToggleProps) {
  const { registerTimeout } = useTimeout()
  const {
    registerTimeout: registerTimeoutForAutoClose,
    cancelTimeout: cancelTimeoutForAutoClose,
  } = useTimeout()

  const onOpen = (event?: Event) => {
    registerTimeout(() => {
      open(event)

      const _autoClose = unref(autoClose)
      if (isNumber(_autoClose) && _autoClose > 0) {
        registerTimeoutForAutoClose(() => {
          close(event)
        }, _autoClose)
      }
    }, unref(showAfter))
  }

  const onClose = (event?: Event) => {
    cancelTimeoutForAutoClose()

    registerTimeout(() => {
      close(event)
    }, unref(hideAfter))
  }

  return {
    onClose,
    onOpen,
  }
}
// 2.4.2

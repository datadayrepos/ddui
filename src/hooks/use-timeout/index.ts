import { tryOnScopeDispose } from '@datadayrepos/usevueshared'

export function useTimeout() {
  let timeoutHandle: number
  const cancelTimeout = () => window.clearTimeout(timeoutHandle)
  const registerTimeout = (fn: (...args: any[]) => any, delay: number) => {
    cancelTimeout()
    timeoutHandle = window.setTimeout(fn, delay)
  }

  tryOnScopeDispose(() => cancelTimeout())

  return {
    cancelTimeout,
    registerTimeout,
  }
}
// 2.4.2

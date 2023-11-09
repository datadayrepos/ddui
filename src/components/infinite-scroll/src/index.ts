// @ts-nocheck
import { nextTick } from 'vue'
import { isFunction } from '@vue/shared'
import { throttle } from '@datadayrepos/lodashts'
import {
  getOffsetTopDistance,
  getScrollContainer,
  throwError,
} from '/@/utils'

import type { ComponentPublicInstance, ObjectDirective } from 'vue'

export const SCOPE = 'ElInfiniteScroll'
export const CHECK_INTERVAL = 50
export const DEFAULT_DELAY = 200
export const DEFAULT_DISTANCE = 0

const attributes = {
  delay: {
    default: DEFAULT_DELAY,
    type: Number,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  distance: {
    default: DEFAULT_DISTANCE,
    type: Number,
  },
  immediate: {
    default: true,
    type: Boolean,
  },
}

type Attrs = typeof attributes
type ScrollOptions = { [K in keyof Attrs]: Attrs[K]['default'] }
type InfiniteScrollCallback = () => void
type InfiniteScrollEl = HTMLElement & {
  [SCOPE]: {
    container: HTMLElement | Window
    containerEl: HTMLElement
    instance: ComponentPublicInstance
    delay: number // export for test
    lastScrollTop: number
    cb: InfiniteScrollCallback
    onScroll: () => void
    observer?: MutationObserver
  }
}

function getScrollOptions(el: HTMLElement, instance: ComponentPublicInstance): ScrollOptions {
  return Object.entries(attributes).reduce((acm, [name, option]) => {
    const { type, default: defaultValue } = option
    const attrVal = el.getAttribute(`infinite-scroll-${name}`)
    let value = instance[attrVal] ?? attrVal ?? defaultValue
    value = value === 'false' ? false : value
    value = type(value)
    acm[name] = Number.isNaN(value) ? defaultValue : value
    return acm
  }, {} as ScrollOptions)
}

function destroyObserver(el: InfiniteScrollEl) {
  const { observer } = el[SCOPE]

  if (observer) {
    observer.disconnect()
    delete el[SCOPE].observer
  }
}

function handleScroll(el: InfiniteScrollEl, cb: InfiniteScrollCallback) {
  const { container, containerEl, instance, observer, lastScrollTop }
    = el[SCOPE]
  const { disabled, distance } = getScrollOptions(el, instance)
  const { clientHeight, scrollHeight, scrollTop } = containerEl
  const delta = scrollTop - lastScrollTop

  el[SCOPE].lastScrollTop = scrollTop

  // trigger only if full check has done and not disabled and scroll down
  if (observer || disabled || delta < 0)
    return

  let shouldTrigger = false

  if (container === el) {
    shouldTrigger = scrollHeight - (clientHeight + scrollTop) <= distance
  }
  else {
    // get the scrollHeight since el might be visible overflow
    const { clientTop, scrollHeight: height } = el
    const offsetTop = getOffsetTopDistance(el, containerEl)
    shouldTrigger
      = scrollTop + clientHeight >= offsetTop + clientTop + height - distance
  }

  if (shouldTrigger)
    cb.call(instance)
}

function checkFull(el: InfiniteScrollEl, cb: InfiniteScrollCallback) {
  const { containerEl, instance } = el[SCOPE]
  const { disabled } = getScrollOptions(el, instance)

  if (disabled || containerEl.clientHeight === 0)
    return

  if (containerEl.scrollHeight <= containerEl.clientHeight)
    cb.call(instance)
  else
    destroyObserver(el)
}

const InfiniteScroll: ObjectDirective<
  InfiniteScrollEl,
  InfiniteScrollCallback
> = {
  async mounted(el, binding) {
    const { instance, value: cb } = binding

    if (!isFunction(cb))
      throwError(SCOPE, '\'v-infinite-scroll\' binding value must be a function')

    // ensure parentNode mounted
    await nextTick()

    const { delay, immediate } = getScrollOptions(el, instance)
    const container = getScrollContainer(el, true)
    const containerEl
      = container === window
        ? document.documentElement
        : (container as HTMLElement)
    const onScroll = throttle(handleScroll.bind(null, el, cb), delay)

    if (!container)
      return

    el[SCOPE] = {
      cb,
      container,
      containerEl,
      delay,
      instance,
      lastScrollTop: containerEl.scrollTop,
      onScroll,
    }

    if (immediate) {
      const observer = new MutationObserver(
        throttle(checkFull.bind(null, el, cb), CHECK_INTERVAL),
      )
      el[SCOPE].observer = observer
      observer.observe(el, { childList: true, subtree: true })
      checkFull(el, cb)
    }

    container.addEventListener('scroll', onScroll)
  },
  unmounted(el) {
    const { container, onScroll } = el[SCOPE]

    container?.removeEventListener('scroll', onScroll)
    destroyObserver(el)
  },
  async updated(el) {
    if (!el[SCOPE]) {
      await nextTick()
    }
    else {
      const { containerEl, cb, observer } = el[SCOPE]
      if (containerEl.clientHeight && observer)
        checkFull(el, cb)
    }
  },
}

export default InfiniteScroll

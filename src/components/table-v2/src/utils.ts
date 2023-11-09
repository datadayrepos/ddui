import { createCommentVNode, isVNode } from 'vue'
import { addUnit, isArray, isFunction } from '/@/utils'

import type { CSSProperties, VNode } from 'vue'

const sumReducer = (sum: number, num: number) => sum + num

export function sum(listLike: number | number[]) {
  return isArray(listLike) ? listLike.reduce(sumReducer, 0) : listLike
}

export function tryCall<T>(fLike: T, params: T extends (...args: infer K) => unknown ? K : any, defaultRet = {}) {
  return isFunction(fLike) ? fLike(params) : fLike ?? defaultRet
}

export function enforceUnit(style: CSSProperties) {
  ;(['width', 'maxWidth', 'minWidth', 'height'] as const).forEach((key) => {
    style[key] = addUnit(style[key])
  })

  return style
}

export function componentToSlot<T>(ComponentLike: VNode | ((props: T) => VNode) | undefined): (props: T) => VNode {
  if (ComponentLike && isVNode(ComponentLike)) {
    // If it's a VNode, we create a slot that renders it directly.
    return () => ComponentLike
  }
  else if (typeof ComponentLike === 'function') {
    // If it's a component definition or a functional component, we create a slot that renders the component with the given props.
    return (props: T) => (ComponentLike as (props: T) => VNode)(props)
  }
  else {
    // Return an empty comment vnode to represent an empty slot
    return () => createCommentVNode('empty slot')
  }
}

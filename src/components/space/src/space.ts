import {
  createTextVNode,
  createVNode,
  defineComponent,
  isVNode,
  renderSlot,
} from 'vue'
import { isString } from '@vue/shared'
import {
  PatchFlags,
  buildProps,
  definePropType,
  isArray,
  isFragment,
  isNumber,
  isValidElementNode,
} from '/@/utils'
import { componentSizes } from '/@/constants'
import type {
  ExtractPropTypes,
  StyleValue,
  VNode,
  VNodeArrayChildren,
  VNodeChild,
} from 'vue'
import type { AlignItemsProperty } from '/@/csstype'
import Item from './item'
import { useSpace } from './use-space'

import type { Arrayable } from '/@/utils'

export const spaceProps = buildProps({
  /**
   * @description Controls the alignment of items
   */
  alignment: {
    default: 'center',
    type: definePropType<AlignItemsProperty>(String),
  },
  /**
   * @description Classname
   */
  class: {
    default: '',
    type: definePropType<Arrayable<Record<string, boolean> | string>>([
      String,
      Object,
      Array,
    ]),
  },
  /**
   * @description Placement direction
   */
  direction: {
    default: 'horizontal',
    type: String,
    values: ['horizontal', 'vertical'],
  },
  /**
   * @description Whether to fill the container
   */
  fill: Boolean,
  /**
   * @description Ratio of fill
   */
  fillRatio: {
    default: 100,
    type: Number,
  },
  /**
   * @description Prefix for space-items
   */
  prefixCls: {
    type: String,
  },
  /**
   * @description Spacing size
   */
  size: {
    type: [String, Array, Number],
    validator: (val: unknown): val is [number, number] | number => {
      return (
        isNumber(val)
        || (isArray(val) && val.length === 2 && val.every(isNumber))
      )
    },
    values: componentSizes,
  },
  /**
   * @description Spacer
   */
  spacer: {
    default: null,
    type: definePropType<VNodeChild>([Object, String, Number, Array]),
    validator: (val: unknown) => isVNode(val) || isNumber(val) || isString(val),
  },
  /**
   * @description Extra style rules
   */
  style: {
    default: '',
    type: definePropType<StyleValue>([String, Array, Object]),
  },
  /**
   * @description Auto wrapping
   */
  wrap: Boolean,
} as const)
export type SpaceProps = ExtractPropTypes<typeof spaceProps>

const Space = defineComponent({
  name: 'ElSpace',

  props: spaceProps,

  setup(props, { slots }) {
    const { classes, containerStyle, itemStyle } = useSpace(props)

    // retrieve the children out via a simple for loop
    // the edge case here is that when users uses directives like <v-for>, <v-if>
    // we need to go deeper until the child is not the Fragment type
    function extractChildren(
      children: VNodeArrayChildren,
      parentKey = '',
      extractedChildren: VNode[] = [],
    ) {
      const { prefixCls } = props
      children.forEach((child, loopKey) => {
        if (isFragment(child)) {
          if (isArray(child.children)) {
            child.children.forEach((nested, key) => {
              if (isFragment(nested) && isArray(nested.children)) {
                extractChildren(
                  nested.children,
                  `${parentKey + key}-`,
                  extractedChildren,
                )
              }
              else {
                extractedChildren.push(
                  createVNode(
                    Item,
                    {
                      key: `nested-${parentKey + key}`,
                      prefixCls,
                      style: itemStyle.value,
                    },
                    {
                      default: () => [nested],
                    },
                    PatchFlags.PROPS | PatchFlags.STYLE,
                    ['style', 'prefixCls'],
                  ),
                )
              }
            })
          }
          // if the current child is valid vnode, then append this current vnode
          // to item as child node.
        }
        else if (isValidElementNode(child)) {
          extractedChildren.push(
            createVNode(
              Item,
              {
                key: `LoopKey${parentKey + loopKey}`,
                prefixCls,
                style: itemStyle.value,
              },
              {
                default: () => [child],
              },
              PatchFlags.PROPS | PatchFlags.STYLE,
              ['style', 'prefixCls'],
            ),
          )
        }
      })

      return extractedChildren
    }

    return () => {
      const { spacer, direction } = props

      const children = renderSlot(slots, 'default', { key: 0 }, () => [])

      if ((children.children ?? []).length === 0)
        return null
      // loop the children, if current children is rendered via `renderList` or `<v-for>`
      if (isArray(children.children)) {
        let extractedChildren = extractChildren(children.children)

        if (spacer) {
          // track the current rendering index, when encounters the last element
          // then no need to add a spacer after it.
          const len = extractedChildren.length - 1
          extractedChildren = extractedChildren.reduce<VNode[]>(
            (acc, child, idx) => {
              const children = [...acc, child]
              if (idx !== len) {
                children.push(
                  createVNode(
                    'span',
                    // adding width 100% for vertical alignment,
                    // when the spacer inherit the width from the
                    // parent, this span's width was not set, so space
                    // might disappear
                    {
                      key: idx,
                      style: [
                        itemStyle.value,
                        direction === 'vertical' ? 'width: 100%' : null,
                      ],
                    },
                    [
                      // if spacer is already a valid vnode, then append it to the current
                      // span element.
                      // otherwise, treat it as string.
                      isVNode(spacer)
                        ? spacer
                        : createTextVNode(spacer as string, PatchFlags.TEXT),
                    ],
                    PatchFlags.STYLE,
                  ),
                )
              }
              return children
            },
            [],
          )
        }

        // spacer container.
        return createVNode(
          'div',
          {
            class: classes.value,
            style: containerStyle.value,
          },
          extractedChildren,
          PatchFlags.STYLE | PatchFlags.CLASS,
        )
      }

      return children.children
    }
  },
})

export type SpaceInstance = InstanceType<typeof Space>

export default Space

import { buildProps, definePropType } from '/@/utils'
import { createCollectionWithScope } from '/@/components/collection'
import type { ExtractPropTypes, HTMLAttributes, StyleValue } from 'vue'

export const rovingFocusGroupProps = buildProps({
  currentTabId: {
    type: definePropType<string | null>(String),
  },
  defaultCurrentTabId: String,
  dir: {
    default: 'ltr',
    type: String, // left for direction support
    values: ['ltr', 'rtl'],
  },
  loop: Boolean,
  onBlur: Function,
  onFocus: Function,

  onMousedown: Function,
  orientation: {
    // left for orientation support
    type: definePropType<HTMLAttributes['aria-orientation']>(String),
  },
  style: { type: definePropType<StyleValue>([String, Array, Object]) },
})

export type ElRovingFocusGroupProps = ExtractPropTypes<
  typeof rovingFocusGroupProps
>

const {
  ElCollection,
  ElCollectionItem,
  COLLECTION_INJECTION_KEY,
  COLLECTION_ITEM_INJECTION_KEY,
} = createCollectionWithScope('RovingFocusGroup')

export {
  ElCollection,
  ElCollectionItem,
  COLLECTION_INJECTION_KEY as ROVING_FOCUS_COLLECTION_INJECTION_KEY,
  COLLECTION_ITEM_INJECTION_KEY as ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY,
}

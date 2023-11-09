import { CommonProps } from '/@/components/cascader-panel'
import { buildProps, definePropType, isBoolean } from '/@/utils'
import { useSizeProp } from '/@/hooks'
import { useTooltipContentProps } from '/@/components/tooltip'
import { tagProps } from '/@/components/tag'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '/@/constants'
import type {
  CascaderNode,
  CascaderValue,
} from '/@/components/cascader-panel'

export const cascaderProps = buildProps({
  ...CommonProps,
  /**
   * @description hook function before filtering with the value to be filtered as its parameter. If `false` is returned or a `Promise` is returned and then is rejected, filtering will be aborted
   */
  beforeFilter: {
    default: () => true,
    type: definePropType<(value: string) => boolean | Promise<any>>(Function),
  },
  /**
   * @description whether selected value can be cleared
   */
  clearable: Boolean,
  /**
   * @description whether to collapse tags in multiple selection mode
   */
  collapseTags: Boolean,
  /**
   * @description native input id
   */
  collapseTagsTooltip: {
    default: false,
    type: Boolean,
  },
  /**
   * @description debounce delay when typing filter keyword, in milliseconds
   */
  debounce: {
    default: 300,
    type: Number,
  },
  /**
   * @description whether Cascader is disabled
   */
  disabled: Boolean,
  /**
   * @description customize search logic, the first parameter is `node`, the second is `keyword`, and need return a boolean value indicating whether it hits.
   */
  filterMethod: {
    default: (node: CascaderNode, keyword: string) => node.text.includes(keyword),
    type: definePropType<(node: CascaderNode, keyword: string) => boolean>(
      Function,
    ),
  },
  /**
   * @description whether the options can be searched
   */
  filterable: Boolean,
  /**
   * @description The max tags number to be shown. To use this, collapse-tags must be true
   */
  maxCollapseTags: {
    default: 1,
    type: Number,
  },
  /**
   * @description placeholder of input
   */
  placeholder: String,
  /**
   * @description custom class name for Cascader's dropdown
   */
  popperClass: {
    default: '',
    type: String,
  },
  /**
   * @description option label separator
   */
  separator: {
    default: ' / ',
    type: String,
  },
  /**
   * @description whether to display all levels of the selected value in the input
   */
  showAllLevels: {
    default: true,
    type: Boolean,
  },
  /**
   * @description size of input
   */
  size: useSizeProp,
  /**
   * @description tag type
   */

  tagType: { ...tagProps.type, default: 'info' },
  /**
   * @description whether cascader popup is teleported
   */
  teleported: useTooltipContentProps.teleported,
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    default: true,
    type: Boolean,
  },
})

export const cascaderEmits = {
  [CHANGE_EVENT]: (val: CascaderValue) => !!val || val === null,
  [UPDATE_MODEL_EVENT]: (val: CascaderValue) => !!val || val === null,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  expandChange: (val: CascaderValue) => !!val,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  removeTag: (val: CascaderNode['valueByOption']) => !!val,
  visibleChange: (val: boolean) => isBoolean(val),
}

// Type name is taken(cascader-panel/src/node), needs discussion
// export type CascaderProps = ExtractPropTypes<typeof cascaderProps>

export type CascaderEmits = typeof cascaderEmits

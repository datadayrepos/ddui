import { NOOP } from '@vue/shared'
import {
  buildProps,
  definePropType,
  isObject,
  isString,
} from '/@/utils'
import { useTooltipContentProps } from '/@/components/tooltip'
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '/@/constants'

import type { ExtractPropTypes } from 'vue'
import type Autocomplete from './autocomplete.vue'
import type { Placement } from '/@/components/popper'
import type { Awaitable } from '/@/utils'

export type AutocompleteData = Record<string, any>[]
export type AutocompleteFetchSuggestionsCallback = (
  data: AutocompleteData
) => void
export type AutocompleteFetchSuggestions =
  | ((
    queryString: string,
    cb: AutocompleteFetchSuggestionsCallback
  ) => Awaitable<AutocompleteData> | void)
  | AutocompleteData

export const autocompleteProps = buildProps({
  /**
   * @description whether to show clear button
   */
  clearable: {
    default: false,
    type: Boolean,
  },
  /**
   * @description debounce delay when typing, in milliseconds
   */
  debounce: {
    default: 300,
    type: Number,
  },
  /**
   * @description whether to disable
   */
  disabled: {
    default: false,
    type: Boolean,
  },
  /**
   * @description a method to fetch input suggestions. When suggestions are ready, invoke `callback(data:[])` to return them to Autocomplete
   */
  fetchSuggestions: {
    default: NOOP,
    type: definePropType<AutocompleteFetchSuggestions>([Function, Array]),
  },
  /**
   * @description whether the width of the dropdown is the same as the input
   */
  fitInputWidth: {
    default: false,
    type: Boolean,
  },
  /**
   * @description whether to hide the loading icon in remote search
   */
  hideLoading: {
    default: false,
    type: Boolean,
  },
  /**
   * @description whether to highlight first item in remote search suggestions by default
   */
  highlightFirstItem: {
    default: false,
    type: Boolean,
  },
  /**
   * @description label text
   */
  label: {
    type: String,
  },
  /**
   * @description binding value
   */
  modelValue: {
    default: '',
    type: [String, Number],
  },
  /**
   * @description same as `name` in native input
   */
  name: String,
  /**
   * @description placement of the popup menu
   */
  placement: {
    default: 'bottom-start',
    type: definePropType<Placement>(String),
    values: [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
    ],
  },
  /**
   * @description custom class name for autocomplete's dropdown
   */
  popperClass: {
    default: '',
    type: String,
  },
  /**
   * @description whether to emit a `select` event on enter when there is no autocomplete match
   */
  selectWhenUnmatched: {
    default: false,
    type: Boolean,
  },
  teleported: useTooltipContentProps.teleported,
  /**
   * @description whether show suggestions when input focus
   */
  triggerOnFocus: {
    default: true,
    type: Boolean,
  },
  /**
   * @description key name of the input suggestion object for display
   */
  valueKey: {
    default: 'value',
    type: String,
  },
} as const)
export type AutocompleteProps = ExtractPropTypes<typeof autocompleteProps>

export const autocompleteEmits = {
  [CHANGE_EVENT]: (value: string) => isString(value),
  [INPUT_EVENT]: (value: string) => isString(value),
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  select: (item: Record<string, any>) => isObject(item),
}
export type AutocompleteEmits = typeof autocompleteEmits

export type AutocompleteInstance = InstanceType<typeof Autocomplete>

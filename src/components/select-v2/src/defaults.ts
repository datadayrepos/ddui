import { placements } from '@datadayrepos/popperts'
import { useSizeProp } from '/@/hooks'
import { buildProps, definePropType, iconPropType } from '/@/utils'
import { useTooltipContentProps } from '/@/components/tooltip'
import { CircleClose } from '@element-plus/icons-vue'
import { defaultProps } from './useProps'

import type { Option, OptionType } from './select.types'
import type { Props } from './useProps'
import type { Options, Placement } from '/@/components/popper'

export const SelectProps = buildProps({
  allowCreate: Boolean,
  autocomplete: {
    default: 'none',
    type: definePropType<'none' | 'both' | 'list' | 'inline'>(String),
  },
  automaticDropdown: Boolean,
  clearIcon: {
    default: CircleClose,
    type: iconPropType,
  },
  clearable: Boolean,
  collapseTags: Boolean,
  collapseTagsTooltip: {
    default: false,
    type: Boolean,
  },
  defaultFirstOption: Boolean,
  disabled: Boolean,
  effect: {
    default: 'light',
    type: definePropType<'light' | 'dark' | string>(String),
  },
  estimatedOptionHeight: {
    default: undefined,
    type: Number,
  },
  filterMethod: Function,
  filterable: Boolean,
  height: {
    default: 170, // 5 items by default
    type: Number,
  },
  id: String,
  itemHeight: {
    default: 34,
    type: Number,
  },
  label: String,
  loading: Boolean,
  loadingText: String,
  maxCollapseTags: {
    default: 1,
    type: Number,
  },
  modelValue: {
    type: definePropType<
      any[] | string | number | boolean | Record<string, any> | any
    >([Array, String, Number, Boolean, Object],
    ),
  },
  multiple: Boolean,
  multipleLimit: {
    default: 0,
    type: Number,
  },
  name: String,
  noDataText: String,
  noMatchText: String,
  options: {
    required: true,
    type: definePropType<OptionType[]>(Array),
  },
  persistent: {
    default: true,
    type: Boolean,
  },
  placeholder: {
    type: String,
  },
  placement: {
    default: 'bottom-start',
    type: definePropType<Placement>(String),
    values: placements,
  },
  popperClass: {
    default: '',
    type: String,
  },
  popperOptions: {
    default: () => ({} as Partial<Options>),
    type: definePropType<Partial<Options>>(Object),
  },
  props: {
    default: () => defaultProps,
    type: definePropType<Props>(Object),
  },
  remote: Boolean,
  remoteMethod: Function,
  reserveKeyword: {
    default: true,
    type: Boolean,
  },
  scrollbarAlwaysOn: {
    default: false,
    type: Boolean,
  },
  size: useSizeProp,
  teleported: useTooltipContentProps.teleported,
  validateEvent: {
    default: true,
    type: Boolean,
  },
  valueKey: {
    default: 'value',
    type: String,
  },
} as const)

export const OptionProps = buildProps({
  created: Boolean,
  data: Array,
  disabled: Boolean,
  hovering: Boolean,
  index: Number,
  item: {
    required: true,
    type: definePropType<Option>(Object),
  },
  selected: Boolean,
  style: Object,
} as const)

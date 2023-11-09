import { Star, StarFilled } from '@element-plus/icons-vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '/@/constants'
import {
  buildProps,
  definePropType,
  iconPropType,
  isNumber,
  mutable,
} from '/@/utils'
import { useSizeProp } from '/@/hooks'
import type { Component, ExtractPropTypes } from 'vue'
import type Rate from './rate.vue'

export const rateProps = buildProps({
  /**
   * @description whether picking half start is allowed
   */
  allowHalf: Boolean,
  /**
   * @description whether value can be reset to `0`
   */
  clearable: {
    default: false,
    type: Boolean,
  },
  /**
   * @description colors for icons. If array, it should have 3 elements, each of which corresponds with a score level, else if object, the key should be threshold value between two levels, and the value should be corresponding color
   */
  colors: {
    default: () => mutable(['', '', ''] as const),
    type: definePropType<string[] | Record<number, string>>([Array, Object]),
  },
  /**
   * @description whether Rate is read-only
   */
  disabled: Boolean,
  /**
   * @description color of unselected read-only icons
   */
  disabledVoidColor: {
    default: '',
    type: String,
  },
  /**
   * @description component of unselected read-only icons
   */
  disabledVoidIcon: {
    default: () => StarFilled,
    type: iconPropType,
  },
  /**
   * @description threshold value between medium and high level. The value itself will be included in high level
   */
  highThreshold: {
    default: 4,
    type: Number,
  },
  /**
   * @description icon components. If array, it should have 3 elements, each of which corresponds with a score level, else if object, the key should be threshold value between two levels, and the value should be corresponding icon component
   */
  icons: {
    default: () => [StarFilled, StarFilled, StarFilled],
    type: definePropType<
      Array<string | Component> | Record<number, string | Component>
    >([Array, Object],
    ),
  },
  /**
   * @description native `id` attribute
   */
  id: {
    default: undefined,
    type: String,
  },
  /**
   * @description same as `aria-label` in Rate
   */
  label: {
    default: undefined,
    type: String,
  },
  /**
   * @description threshold value between low and medium level. The value itself will be included in low level
   */
  lowThreshold: {
    default: 2,
    type: Number,
  },
  /**
   * @description max rating score
   */
  max: {
    default: 5,
    type: Number,
  },
  /**
   * @description binding value
   */
  modelValue: {
    default: 0,
    type: Number,
  },
  /**
   * @description score template
   */
  scoreTemplate: {
    default: '{value}',
    type: String,
  },
  /**
   * @description whether to display current score. show-score and show-text cannot be true at the same time
   */
  showScore: Boolean,
  /**
   * @description whether to display texts
   */
  showText: Boolean,
  /**
   * @description size of Rate
   */
  size: useSizeProp,
  /**
   * @description color of texts
   */
  textColor: {
    default: '',
    type: String,
  },
  /**
   * @description text array
   */
  texts: {
    default: () =>
      mutable([
        'Extremely bad',
        'Disappointed',
        'Fair',
        'Satisfied',
        'Surprise',
      ] as const),
    type: definePropType<string[]>(Array),
  },
  /**
   * @description color of unselected icons
   */
  voidColor: {
    default: '',
    type: String,
  },
  /**
   * @description component of unselected icons
   */
  voidIcon: {
    default: () => Star,
    type: iconPropType,
  },
} as const)

export type RateProps = ExtractPropTypes<typeof rateProps>

export const rateEmits = {
  [CHANGE_EVENT]: (value: number) => isNumber(value),
  [UPDATE_MODEL_EVENT]: (value: number) => isNumber(value),
}
export type RateEmits = typeof rateEmits

export type RateInstance = InstanceType<typeof Rate>

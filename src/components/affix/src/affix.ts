import {
  buildProps,
  definePropType,
  isBoolean,
  isNumber,
} from '/@/utils'
import { CHANGE_EVENT } from '/@/constants'
import type { ExtractPropTypes } from 'vue'
import type { ZIndexProperty } from '/@/csstype'
import type Affix from './affix.vue'

export const affixProps = buildProps({
  /**
   * @description offset distance
   */
  offset: {
    default: 0,
    type: Number,
  },
  /**
   * @description position of affix
   */
  position: {
    default: 'top',
    type: String,
    values: ['top', 'bottom'],
  },
  /**
   * @description target container. (CSS selector)
   */
  target: {
    default: '',
    type: String,
  },
  /**
   * @description affix element zIndex value
   */
  zIndex: {
    default: 100,
    type: definePropType<ZIndexProperty>([Number, String]),
  },
} as const)
export type AffixProps = ExtractPropTypes<typeof affixProps>

export const affixEmits = {
  [CHANGE_EVENT]: (fixed: boolean) => isBoolean(fixed),
  scroll: ({ scrollTop, fixed }: { scrollTop: number; fixed: boolean }) =>
    isNumber(scrollTop) && isBoolean(fixed),
}
export type AffixEmits = typeof affixEmits

export type AffixInstance = InstanceType<typeof Affix>

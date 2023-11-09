import { buildProps, definePropType } from '/@/utils'

import type { ExtractPropTypes, StyleValue } from 'vue'
import type { Dayjs } from 'dayjs'
import type Statistic from './statistic.vue'

export const statisticProps = buildProps({
  /**
   * @description Setting the decimal point
   */
  decimalSeparator: {
    default: '.',
    type: String,
  },
  /**
   * @description Custom numerical presentation
   */
  formatter: Function,
  /**
   * @description Sets the thousandth identifier
   */
  groupSeparator: {
    default: ',',
    type: String,
  },
  /**
   * @description numerical precision
   */
  precision: {
    default: 0,
    type: Number,
  },
  /**
   * @description Sets the prefix of a number
   */
  prefix: String,

  /**
   * @description  Sets the suffix of a number
   */
  suffix: String,
  /**
   * @description Numeric titles
   */
  title: String,
  /**
   * @description Numerical content
   */
  value: {
    default: 0,
    type: definePropType<number | Dayjs>([Number, Object]),
  },
  /**
   * @description Styles numeric values
   */
  valueStyle: {
    type: definePropType<StyleValue>([String, Object, Array]),
  },
} as const)
export type StatisticProps = ExtractPropTypes<typeof statisticProps>

export type StatisticInstance = InstanceType<typeof Statistic>

import { componentSizes, datePickTypes } from '../../constants'
import type { ComponentSize, DatePickType } from '../../constants'

export function isValidComponentSize(val: string): val is ComponentSize | '' {
  return ['', ...componentSizes].includes(val)
}

export function isValidDatePickType(val: string): val is DatePickType {
  return ([...datePickTypes] as string[]).includes(val)
}
// 2.4.2

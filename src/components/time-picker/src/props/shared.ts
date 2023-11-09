import { buildProps, definePropType } from '/@/utils'

import type { ExtractPropTypes } from 'vue'
import type { Dayjs } from 'dayjs'

export type GetDisabledHours = (role: string, comparingDate?: Dayjs) => number[]
export type GetDisabledMinutes = (
  hour: number,
  role: string,
  comparingDate?: Dayjs
) => number[]
export type GetDisabledSeconds = (
  hour: number,
  minute: number,
  role: string,
  comparingDate?: Dayjs
) => number[]

export const disabledTimeListsProps = buildProps({
  /**
   * @description To specify the array of hours that cannot be selected
   */
  disabledHours: {
    type: definePropType<GetDisabledHours>(Function),
  },
  /**
   * @description To specify the array of minutes that cannot be selected
   */
  disabledMinutes: {
    type: definePropType<GetDisabledMinutes>(Function),
  },
  /**
   * @description To specify the array of seconds that cannot be selected
   */
  disabledSeconds: {
    type: definePropType<GetDisabledSeconds>(Function),
  },
} as const)

export type DisabledTimeListsProps = ExtractPropTypes<
  typeof disabledTimeListsProps
>

export const timePanelSharedProps = buildProps({
  actualVisible: {
    default: undefined,
    type: Boolean,
  },
  format: {
    default: '',
    type: String,
  },
  visible: Boolean,
} as const)

export type TimePanelSharedProps = ExtractPropTypes<typeof timePanelSharedProps>

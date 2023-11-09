import { buildProps, iconPropType } from '/@/utils'
import type Step from './item.vue'
import type { ExtractPropTypes } from 'vue'

export const stepProps = buildProps({
  /**
   * @description step description
   */
  description: {
    default: '',
    type: String,
  },
  /**
   * @description step custom icon. Icons can be passed via named slot as well
   */
  icon: {
    type: iconPropType,
  },
  /**
   * @description current status. It will be automatically set by Steps if not configured.
   */
  status: {
    default: '',
    type: String,
    values: ['', 'wait', 'process', 'finish', 'error', 'success'],
  },
  /**
   * @description step title
   */
  title: {
    default: '',
    type: String,
  },
} as const)

export type StepProps = ExtractPropTypes<typeof stepProps>

export type StepInstance = InstanceType<typeof Step>

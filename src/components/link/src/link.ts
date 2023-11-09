import { buildProps, iconPropType } from '/@/utils'
import type { ExtractPropTypes } from 'vue'
import type Link from './link.vue'

export const linkProps = buildProps({
  /**
   * @description whether the component is disabled
   */
  disabled: { default: false, type: Boolean },
  /**
   * @description same as native hyperlink's `href`
   */
  href: { default: '', type: String },
  /**
   * @description icon component
   */
  icon: {
    type: iconPropType,
  },
  /**
   * @description type
   */
  type: {
    default: 'default',
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'danger', 'default'],
  },
  /**
   * @description whether the component has underline
   */
  underline: {
    default: true,
    type: Boolean,
  },
} as const)
export type LinkProps = ExtractPropTypes<typeof linkProps>

export const linkEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}
export type LinkEmits = typeof linkEmits

export type LinkInstance = InstanceType<typeof Link>

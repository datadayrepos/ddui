import { buildProps, definePropType } from '/@/utils'
import type { ExtractPropTypes } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

export const breadcrumbItemProps = buildProps({
  /**
   * @description if `true`, the navigation will not leave a history record
   */
  replace: {
    default: false,
    type: Boolean,
  },
  /**
   * @description target route of the link, same as `to` of `vue-router`
   */
  to: {
    default: '',
    type: definePropType<RouteLocationRaw>([String, Object]),
  },
} as const)
export type BreadcrumbItemProps = ExtractPropTypes<typeof breadcrumbItemProps>

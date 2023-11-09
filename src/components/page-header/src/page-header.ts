import { buildProps, iconPropType } from '/@/utils'
import { Back } from '@element-plus/icons-vue'
import type { ExtractPropTypes } from 'vue'
import type PageHeader from './page-header.vue'

export const pageHeaderProps = buildProps({
  /**
   * @description content of page header
   */
  content: {
    default: '',
    type: String,
  },
  /**
   * @description icon component of page header
   */
  icon: {
    default: () => Back,
    type: iconPropType,
  },
  /**
   * @description main title of page header
   */
  title: String,
} as const)
export type PageHeaderProps = ExtractPropTypes<typeof pageHeaderProps>

export const pageHeaderEmits = {
  back: () => true,
}
export type PageHeaderEmits = typeof pageHeaderEmits

export type PageHeaderInstance = InstanceType<typeof PageHeader>

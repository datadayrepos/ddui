import { buildProps, isArray } from '/@/utils'

import type { ExtractPropTypes } from 'vue'
import type UploadDragger from './upload-dragger.vue'

export const uploadDraggerProps = buildProps({
  disabled: {
    default: false,
    type: Boolean,
  },
} as const)
export type UploadDraggerProps = ExtractPropTypes<typeof uploadDraggerProps>

export const uploadDraggerEmits = {
  file: (file: File[]) => isArray(file),
}
export type UploadDraggerEmits = typeof uploadDraggerEmits

export type UploadDraggerInstance = InstanceType<typeof UploadDragger>

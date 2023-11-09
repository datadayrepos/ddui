import { NOOP } from '@vue/shared'
import { buildProps, definePropType, mutable } from '/@/utils'
import type { ExtractPropTypes } from 'vue'
import { uploadListTypes } from './upload'
import type { UploadFile, UploadFiles, UploadHooks } from './upload'
import type UploadList from './upload-list.vue'

export const uploadListProps = buildProps({
  disabled: {
    default: false,
    type: Boolean,
  },
  files: {
    default: () => mutable([]),
    type: definePropType<UploadFiles>(Array),
  },
  handlePreview: {
    default: NOOP,
    type: definePropType<UploadHooks['onPreview']>(Function),
  },
  listType: {
    default: 'text',
    type: String,
    values: uploadListTypes,
  },
} as const)

export type UploadListProps = ExtractPropTypes<typeof uploadListProps>
export const uploadListEmits = {
  remove: (file: UploadFile) => !!file,
}
export type UploadListEmits = typeof uploadListEmits
export type UploadListInstance = InstanceType<typeof UploadList>

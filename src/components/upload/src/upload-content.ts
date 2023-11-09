import { NOOP } from '@vue/shared'
import { buildProps, definePropType } from '/@/utils'
import type { ExtractPropTypes } from 'vue'
import { uploadBaseProps } from './upload'

import type {
  UploadFile,
  UploadHooks,
  UploadProgressEvent,
  UploadRawFile,
} from './upload'
import type UploadContent from './upload-content.vue'
import type { UploadAjaxError } from './ajax'

export const uploadContentProps = buildProps({
  ...uploadBaseProps,

  beforeUpload: {
    default: NOOP,
    type: definePropType<UploadHooks['beforeUpload']>(Function),
  },
  onError: {
    default: NOOP,
    type: definePropType<
    (err: UploadAjaxError, rawFile: UploadRawFile) => void
      >(Function,
      ),
  },
  onExceed: {
    default: NOOP,
    type: definePropType<UploadHooks['onExceed']>(Function),
  },
  onProgress: {
    default: NOOP,
    type: definePropType<
    (evt: UploadProgressEvent, rawFile: UploadRawFile) => void
      >(Function,
      ),
  },
  onRemove: {
    default: NOOP,
    type: definePropType<
    (file: UploadFile | UploadRawFile, rawFile?: UploadRawFile) => void
      >(Function,
      ),
  },
  onStart: {
    default: NOOP,
    type: definePropType<(rawFile: UploadRawFile) => void>(Function),
  },
  onSuccess: {
    default: NOOP,
    type: definePropType<(response: any, rawFile: UploadRawFile) => unknown>(
      Function,
    ),
  },
} as const)

export type UploadContentProps = ExtractPropTypes<typeof uploadContentProps>

export type UploadContentInstance = InstanceType<typeof UploadContent>

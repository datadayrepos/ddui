import { NOOP } from '@vue/shared'
import { buildProps, definePropType, mutable } from '/@/utils'
import type { ExtractPropTypes } from 'vue'
import { ajaxUpload } from './ajax'
import type { Awaitable, Mutable } from '/@/utils'

import type { UploadAjaxError } from './ajax'
import type Upload from './upload.vue'

export const uploadListTypes = ['text', 'picture', 'picture-card'] as const

let fileId = 1
export const genFileId = () => Date.now() + fileId++

export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'
export interface UploadProgressEvent extends ProgressEvent {
  percent: number
}

export interface UploadRequestOptions {
  action: string
  method: string
  data: Record<string, string | Blob | [string | Blob, string]>
  filename: string
  file: UploadRawFile
  headers: Headers | Record<string, string | number | null | undefined>
  onError: (evt: UploadAjaxError) => void
  onProgress: (evt: UploadProgressEvent) => void
  onSuccess: (response: any) => void
  withCredentials: boolean
}
export interface UploadFile {
  name: string
  percentage?: number
  status: UploadStatus
  size?: number
  response?: unknown
  uid: number
  url?: string
  raw?: UploadRawFile
}
export type UploadUserFile = Omit<UploadFile, 'status' | 'uid'> &
Partial<Pick<UploadFile, 'status' | 'uid'>>

export type UploadFiles = UploadFile[]
export interface UploadRawFile extends File {
  uid: number
}
export type UploadRequestHandler = (
  options: UploadRequestOptions
) => XMLHttpRequest | Promise<unknown>
export interface UploadHooks {
  beforeUpload: (
    rawFile: UploadRawFile
  ) => Awaitable<void | undefined | null | boolean | File | Blob>
  beforeRemove: (
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => Awaitable<boolean>
  onRemove: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onChange: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onPreview: (uploadFile: UploadFile) => void
  onSuccess: (
    response: any,
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => void
  onProgress: (
    evt: UploadProgressEvent,
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => void
  onError: (
    error: Error,
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => void
  onExceed: (files: File[], uploadFiles: UploadUserFile[]) => void
}

export type UploadData = Mutable<Record<string, any>>

export const uploadBaseProps = buildProps({
  /**
   * @description accepted [file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept), will not work when `thumbnail-mode === true`
   */
  accept: {
    default: '',
    type: String,
  },
  /**
   * @description request URL
   */
  action: {
    default: '#',
    type: String,
  },
  /**
   * @description whether to auto upload file
   */
  autoUpload: {
    default: true,
    type: Boolean,
  },
  /**
   * @description additions options of request
   */
  data: {
    default: () => mutable({} as const),
    type: definePropType<
      | Awaitable<UploadData>
      | ((rawFile: UploadRawFile) => Awaitable<UploadData>)
        >([Object, Function, Promise],
        ),
  },
  /**
   * @description whether to disable upload
   */
  disabled: Boolean,
  /**
   * @description whether to activate drag and drop mode
   */
  drag: {
    default: false,
    type: Boolean,
  },
  /**
   * @description default uploaded files
   */
  fileList: {
    default: () => mutable([] as const),
    type: definePropType<UploadUserFile[]>(Array),
  },
  /**
   * @description request headers
   */
  headers: {
    type: definePropType<Headers | Record<string, any>>(Object),
  },
  /**
   * @description override default xhr behavior, allowing you to implement your own upload-file's request
   */
  httpRequest: {
    default: ajaxUpload,
    type: definePropType<UploadRequestHandler>(Function),
  },
  /**
   * @description maximum number of uploads allowed
   */
  limit: Number,
  /**
   * @description type of file list
   */
  listType: {
    default: 'text',
    type: String,
    values: uploadListTypes,
  },
  /**
   * @description set upload request method
   */
  method: {
    default: 'post',
    type: String,
  },
  /**
   * @description whether uploading multiple files is permitted
   */
  multiple: {
    default: false,
    type: Boolean,
  },
  /**
   * @description key name for uploaded file
   */
  name: {
    default: 'file',
    type: String,
  },
  /**
   * @description whether to show the uploaded file list
   */
  showFileList: {
    default: true,
    type: Boolean,
  },
  /**
   * @description whether cookies are sent
   */
  withCredentials: Boolean,
} as const)

export const uploadProps = buildProps({
  ...uploadBaseProps,
  /**
   * @description hook function before removing a file with the file and file list as its parameters. If `false` is returned or a `Promise` is returned and then is rejected, removing will be aborted
   */
  beforeRemove: {
    type: definePropType<UploadHooks['beforeRemove']>(Function),
  },
  /**
   * @description hook function before uploading with the file to be uploaded as its parameter. If `false` is returned or a `Promise` is returned and then is rejected, uploading will be aborted
   */
  beforeUpload: {
    default: NOOP,
    type: definePropType<UploadHooks['beforeUpload']>(Function),
  },
  /**
   * @description hook function when select file or upload file success or upload file fail
   */
  onChange: {
    default: NOOP,
    type: definePropType<UploadHooks['onChange']>(Function),
  },
  /**
   * @description hook function when some errors occurs
   */
  onError: {
    default: NOOP,
    type: definePropType<UploadHooks['onError']>(Function),
  },
  /**
   * @description hook function when limit is exceeded
   */
  onExceed: {
    default: NOOP,
    type: definePropType<UploadHooks['onExceed']>(Function),
  },
  /**
   * @description hook function when clicking the uploaded files
   */
  onPreview: {
    default: NOOP,
    type: definePropType<UploadHooks['onPreview']>(Function),
  },
  /**
   * @description hook function when some progress occurs
   */
  onProgress: {
    default: NOOP,
    type: definePropType<UploadHooks['onProgress']>(Function),
  },
  /**
   * @description hook function when files are removed
   */
  onRemove: {
    default: NOOP,
    type: definePropType<UploadHooks['onRemove']>(Function),
  },
  /**
   * @description hook function when uploaded successfully
   */
  onSuccess: {
    default: NOOP,
    type: definePropType<UploadHooks['onSuccess']>(Function),
  },
} as const)

export type UploadProps = ExtractPropTypes<typeof uploadProps>

export type UploadInstance = InstanceType<typeof Upload>

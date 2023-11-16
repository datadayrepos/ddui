<template>
  <div
    :class="[ns.b(), ns.m(listType), ns.is('drag', drag)]"
    tabindex="0"
    @click="handleClick"
    @keydown.self.enter.space="handleKeydown"
  >
    <template v-if="drag">
      <UploadDragger :disabled="disabled" @file="uploadFiles">
        <slot />
      </UploadDragger>
    </template>
    <template v-else>
      <slot />
    </template>
    <input
      ref="inputRef"
      :class="ns.e('input')"
      :name="name"
      :multiple="multiple"
      :accept="accept"
      type="file"
      @change="handleChange"
      @click.stop
    >
  </div>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue'

// eslint-disable-next-line vue/prefer-import-from-vue
import { isPlainObject } from '@vue/shared'
import { cloneDeep, isEqual } from '@datadayrepos/lodashts'
import { useNamespace } from '/@/hooks'
import { entriesOf, isFunction } from '/@/utils'
import { useFormDisabled } from '/@/components/form'
import UploadDragger from './upload-dragger.vue'
import { uploadContentProps } from './upload-content'
import { genFileId } from './upload'
import type { UploadContentProps } from './upload-content'

import type {
  UploadFile,
  UploadHooks,
  UploadRawFile,
  UploadRequestOptions,
} from './upload'

const props = defineProps(uploadContentProps)

defineOptions({
  name: 'ElUploadContent',
  inheritAttrs: false,
})

const ns = useNamespace('upload')
const disabled = useFormDisabled()

const requests = shallowRef<Record<string, XMLHttpRequest | Promise<unknown>>>(
  {},
)
const inputRef = shallowRef<HTMLInputElement>()

function uploadFiles(files: File[]) {
  if (files.length === 0)
    return

  const { autoUpload, limit, fileList, multiple, onStart, onExceed } = props

  if (limit && fileList.length + files.length > limit) {
    onExceed(files, fileList)
    return
  }

  if (!multiple)
    files = files.slice(0, 1)

  for (const file of files) {
    const rawFile = file as UploadRawFile
    rawFile.uid = genFileId()
    onStart(rawFile)
    if (autoUpload)
      upload(rawFile)
  }
}

async function upload(rawFile: UploadRawFile): Promise<void> {
  inputRef.value!.value = ''

  if (!props.beforeUpload)
    return doUpload(rawFile)

  let hookResult: Exclude<ReturnType<UploadHooks['beforeUpload']>, Promise<any>>
  let beforeData: UploadContentProps['data'] = {}

  try {
    // origin data: Handle data changes after synchronization tasks are executed
    const originData = props.data
    const beforeUploadPromise = props.beforeUpload(rawFile)
    beforeData = isPlainObject(props.data) ? cloneDeep(props.data) : props.data
    hookResult = await beforeUploadPromise
    if (isPlainObject(props.data) && isEqual(originData, beforeData))
      beforeData = cloneDeep(props.data)
  }
  catch {
    hookResult = false
  }

  if (hookResult === false) {
    props.onRemove(rawFile)
    return
  }

  let file: File = rawFile
  if (hookResult instanceof Blob) {
    if (hookResult instanceof File) {
      file = hookResult
    }
    else {
      file = new File([hookResult], rawFile.name, {
        type: rawFile.type,
      })
    }
  }

  doUpload(
    Object.assign(file, {
      uid: rawFile.uid,
    }),
    beforeData,
  )
}

async function resolveData(data: UploadContentProps['data'], rawFile: UploadRawFile): Promise<Record<string, any>> {
  if (isFunction(data))
    return data(rawFile)

  return data
}

async function doUpload(rawFile: UploadRawFile, beforeData?: UploadContentProps['data']) {
  const {
    headers,
    data,
    method,
    withCredentials,
    name: filename,
    action,
    onProgress,
    onSuccess,
    onError,
    httpRequest,
  } = props

  try {
    beforeData = await resolveData(beforeData ?? data, rawFile)
  }
  catch {
    props.onRemove(rawFile)
    return
  }

  const { uid } = rawFile
  const options: UploadRequestOptions = {
    headers: headers || {},
    withCredentials,
    file: rawFile,
    data: beforeData,
    method,
    filename,
    action,
    onProgress: (evt) => {
      onProgress(evt, rawFile)
    },
    onSuccess: (res) => {
      onSuccess(res, rawFile)
      delete requests.value[uid]
    },
    onError: (err) => {
      onError(err, rawFile)
      delete requests.value[uid]
    },
  }
  const request = httpRequest(options)
  requests.value[uid] = request
  if (request instanceof Promise)
    request.then(options.onSuccess, options.onError)
}

function handleChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files)
    return
  uploadFiles(Array.from(files))
}

function handleClick() {
  if (!disabled.value) {
    inputRef.value!.value = ''
    inputRef.value!.click()
  }
}

function handleKeydown() {
  handleClick()
}

function abort(file?: UploadFile) {
  const _reqs = entriesOf(requests.value).filter(
    file ? ([uid]) => String(file.uid) === uid : () => true,
  )
  _reqs.forEach(([uid, req]) => {
    if (req instanceof XMLHttpRequest)
      req.abort()
    delete requests.value[uid]
  })
}

defineExpose({
  abort,
  upload,
})
</script>

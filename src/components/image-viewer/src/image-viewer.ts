import {
  buildProps,
  definePropType,
  isNumber,
  mutable,
} from '/@/utils'

import type { Component, ExtractPropTypes } from 'vue'
import type ImageViewer from './image-viewer.vue'

export type ImageViewerAction =
  | 'zoomIn'
  | 'zoomOut'
  | 'clockwise'
  | 'anticlockwise'

export const imageViewerProps = buildProps({
  /**
   * @description whether the image-viewer can be closed by pressing ESC.
   */
  closeOnPressEscape: {
    default: true,
    type: Boolean,
  },
  /**
   * @description whether user can emit close event when clicking backdrop.
   */
  hideOnClickModal: Boolean,
  /**
   * @description whether preview is infinite.
   */
  infinite: {
    default: true,
    type: Boolean,
  },
  /**
   * @description the initial preview image index, less than or equal to the length of `url-list`.
   */
  initialIndex: {
    default: 0,
    type: Number,
  },
  /**
   * @description the max scale of the image viewer zoom event.
   */
  maxScale: {
    default: 7,
    type: Number,
  },
  /**
   * @description the min scale of the image viewer zoom event.
   */
  minScale: {
    default: 0.2,
    type: Number,
  },
  /**
   * @description whether to append image itself to body. A nested parent element attribute transform should have this attribute set to `true`.
   */
  teleported: Boolean,
  /**
   * @description preview link list.
   */
  urlList: {
    default: () => mutable([] as const),
    type: definePropType<string[]>(Array),
  },
  /**
   * @description preview backdrop z-index.
   */
  zIndex: {
    type: Number,
  },
  /**
   * @description the zoom rate of the image viewer zoom event.
   */
  zoomRate: {
    default: 1.2,
    type: Number,
  },
} as const)
export type ImageViewerProps = ExtractPropTypes<typeof imageViewerProps>

export const imageViewerEmits = {
  close: () => true,
  rotate: (deg: number) => isNumber(deg),
  switch: (index: number) => isNumber(index),
}
export type ImageViewerEmits = typeof imageViewerEmits

export interface ImageViewerMode {
  name: string
  icon: Component
}

export type ImageViewerInstance = InstanceType<typeof ImageViewer>

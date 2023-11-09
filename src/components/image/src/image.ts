import {
  buildProps,
  definePropType,
  isNumber,
  mutable,
} from '/@/utils'

import type { ExtractPropTypes } from 'vue'

export const imageProps = buildProps({
  /**
   * @description whether the image-viewer can be closed by pressing ESC.
   */
  closeOnPressEscape: {
    default: true,
    type: Boolean,
  },
  /**
   * @description indicate how the image should be resized to fit its container, same as [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).
   */
  fit: {
    default: '',
    type: String,
    values: ['', 'contain', 'cover', 'fill', 'none', 'scale-down'],
  },
  /**
   * @description when enabling preview, use this flag to control whether clicking on backdrop can exit preview mode.
   */
  hideOnClickModal: Boolean,
  /**
   * @description whether the viewer preview is infinite.
   */
  infinite: {
    default: true,
    type: Boolean,
  },
  /**
   * @description initial preview image index, less than the length of `url-list`.
   */
  initialIndex: {
    default: 0,
    type: Number,
  },
  /**
   * @description whether to use lazy load.
   */
  lazy: Boolean,
  /**
   * @description Indicates how the browser should load the image, same as [native](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading)
   */
  loading: {
    type: String,
    values: ['eager', 'lazy'],
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
   * @description allow big image preview.
   */
  previewSrcList: {
    default: () => mutable([] as const),
    type: definePropType<string[]>(Array),
  },
  /**
   * @description whether to append image-viewer to body. A nested parent element attribute transform should have this attribute set to `true`.
   */
  previewTeleported: Boolean,
  /**
   * @description the container to add scroll listener when using lazy load.
   */
  scrollContainer: {
    type: definePropType<string | HTMLElement | undefined>([String, Object]),
  },
  /**
   * @description image source, same as native.
   */
  src: {
    default: '',
    type: String,
  },
  /**
   * @description set image preview z-index.
   */
  zIndex: {
    type: Number,
  },
  /**
   * @description the zoom rate of the image viewer zoom event
   */
  zoomRate: {
    default: 1.2,
    type: Number,
  },
} as const)
export type ImageProps = ExtractPropTypes<typeof imageProps>

export const imageEmits = {
  close: () => true,
  error: (evt: Event) => evt instanceof Event,
  load: (evt: Event) => evt instanceof Event,
  show: () => true,
  switch: (val: number) => isNumber(val),
}
export type ImageEmits = typeof imageEmits

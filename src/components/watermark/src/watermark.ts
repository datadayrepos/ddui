import { buildProps, definePropType } from '/@/utils'

import type { ExtractPropTypes } from 'vue'
import type Watermark from './watermark.vue'

export interface WatermarkFontType {
  color?: string
  fontSize?: number | string
  fontWeight?: 'normal' | 'light' | 'weight' | number
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique'
  fontFamily?: string
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center'
  textBaseline?:
  | 'top'
  | 'hanging'
  | 'middle'
  | 'alphabetic'
  | 'ideographic'
  | 'bottom'
}

export const watermarkProps = buildProps({
  /**
   * @description Watermark text content
   */
  content: {
    default: 'Element Plus',
    type: definePropType<string | string[]>([String, Array]),
  },
  /**
   * @description Text style
   */
  font: {
    type: definePropType<WatermarkFontType>(Object),
  },
  /**
   * @description The spacing between watermarks
   */
  gap: {
    default: () => [100, 100],
    type: definePropType<[number, number]>(Array),
  },
  /**
   * @description The height of the watermark
   */
  height: Number,
  /**
   * @description Image source, it is recommended to export 2x or 3x image, high priority (support base64 format)
   */
  image: String,
  /**
   * @description The offset of the watermark from the upper left corner of the container. The default is gap/2
   */
  offset: {
    type: definePropType<[number, number]>(Array),
  },
  /**
   * @description The rotation angle of the watermark
   */
  rotate: {
    default: -22,
    type: Number,
  },
  /**
   * @description The width of the watermark
   */
  width: Number,
  /**
   * @description The z-index of the appended watermark element
   */
  zIndex: {
    default: 9,
    type: Number,
  },
} as const)

export type WatermarkProps = ExtractPropTypes<typeof watermarkProps>
export type WatermarkInstance = InstanceType<typeof Watermark>

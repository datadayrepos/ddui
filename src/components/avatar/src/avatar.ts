import {
  buildProps,
  definePropType,
  iconPropType,
  isNumber,
} from '/@/utils'
import { componentSizes } from '/@/constants'
import type { ExtractPropTypes } from 'vue'
import type { ObjectFitProperty } from '/@/csstype'

export const avatarProps = buildProps({
  /**
   * @description native attribute `alt` of image avatar.
   */
  alt: String,
  /**
   * @description set how the image fit its container for an image avatar.
   */
  fit: {
    default: 'cover',
    type: definePropType<ObjectFitProperty>(String),
  },
  /**
   * @description representation type to icon, more info on icon component.
   */
  icon: {
    type: iconPropType,
  },
  /**
   * @description avatar shape.
   */
  shape: {
    default: 'circle',
    type: String,
    values: ['circle', 'square'],
  },
  /**
   * @description avatar size.
   */
  size: {
    default: '',
    type: [Number, String],
    validator: (val: unknown): val is number => isNumber(val),
    values: componentSizes,
  },
  /**
   * @description the source of the image for an image avatar.
   */
  src: {
    default: '',
    type: String,
  },
  /**
   * @description native attribute srcset of image avatar.
   */
  srcSet: String,
} as const)
export type AvatarProps = ExtractPropTypes<typeof avatarProps>

export const avatarEmits = {
  error: (evt: Event) => evt instanceof Event,
}
export type AvatarEmits = typeof avatarEmits

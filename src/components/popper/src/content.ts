import { placements } from '@datadayrepos/popperts'
import { buildProps, definePropType } from '/@/utils'

import type { ExtractPropTypes, StyleValue } from 'vue'
import type { Options, Placement } from '@datadayrepos/popperts'
import type { Measurable } from './constants'
import type Content from './content.vue'

type ClassObjectType = Record<string, boolean>
type ClassType = string | ClassObjectType | ClassType[]

const POSITIONING_STRATEGIES = ['fixed', 'absolute'] as const

export interface CreatePopperInstanceParams {
  referenceEl: Measurable
  popperContentEl: HTMLElement
  arrowEl: HTMLElement | undefined
}

export const popperCoreConfigProps = buildProps({
  boundariesPadding: {
    default: 0,
    type: Number,
  },
  fallbackPlacements: {
    default: undefined,
    type: definePropType<Placement[]>(Array),
  },
  gpuAcceleration: {
    default: true,
    type: Boolean,
  },
  /**
   * @description offset of the Tooltip
   */
  offset: {
    default: 12,
    type: Number,
  },
  /**
   * @description position of Tooltip
   */
  placement: {
    default: 'bottom',
    type: String,
    values: placements,
  },
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) parameters
   */
  popperOptions: {
    default: () => ({}),
    type: definePropType<Partial<Options>>(Object),
  },
  strategy: {
    default: 'absolute',
    type: String,
    values: POSITIONING_STRATEGIES,
  },
} as const)
export type PopperCoreConfigProps = ExtractPropTypes<
  typeof popperCoreConfigProps
>

export const popperContentProps = buildProps({
  ...popperCoreConfigProps,
  ariaLabel: {
    default: undefined,
    type: String,
  },
  className: {
    type: definePropType<ClassType>([String, Array, Object]),
  },
  effect: {
    default: 'dark',
    type: String,
  },
  enterable: {
    default: true,
    type: Boolean,
  },
  focusOnShow: {
    default: false,
    type: Boolean,
  },
  id: String,
  popperClass: {
    type: definePropType<ClassType>([String, Array, Object]),
  },
  popperStyle: {
    type: definePropType<StyleValue>([String, Array, Object]),
  },
  pure: Boolean,
  referenceEl: {
    type: definePropType<HTMLElement>(Object),
  },
  stopPopperMouseEvent: {
    default: true,
    type: Boolean,
  },
  style: {
    type: definePropType<StyleValue>([String, Array, Object]),
  },
  trapping: {
    default: false,
    type: Boolean,
  },
  triggerTargetEl: {
    type: definePropType<HTMLElement>(Object),
  },
  virtualTriggering: Boolean,
  visible: Boolean,
  zIndex: Number,
} as const)
export type PopperContentProps = ExtractPropTypes<typeof popperContentProps>

export const popperContentEmits = {
  blur: () => true,
  close: () => true,
  focus: () => true,
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
}
export type PopperContentEmits = typeof popperContentEmits

export type PopperContentInstance = InstanceType<typeof Content>

/** @deprecated use `popperCoreConfigProps` instead, and it will be deprecated in the next major version */
export const usePopperCoreConfigProps = popperCoreConfigProps

/** @deprecated use `popperContentProps` instead, and it will be deprecated in the next major version */
export const usePopperContentProps = popperContentProps

/** @deprecated use `popperContentEmits` instead, and it will be deprecated in the next major version */
export const usePopperContentEmits = popperContentEmits

/** @deprecated use `PopperCoreConfigProps` instead, and it will be deprecated in the next major version */
export type UsePopperCoreConfigProps = PopperCoreConfigProps

/** @deprecated use `PopperContentProps` instead, and it will be deprecated in the next major version */
export type UsePopperContentProps = PopperContentProps

/** @deprecated use `PopperContentInstance` instead, and it will be deprecated in the next major version */
export type ElPopperArrowContent = PopperContentInstance

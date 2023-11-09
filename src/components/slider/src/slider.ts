import { placements } from '@datadayrepos/popperts'
import {
  buildProps,
  definePropType,
  isArray,
  isNumber,
} from '/@/utils'
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '/@/constants'
import { useSizeProp } from '/@/hooks'
import type { Arrayable } from '/@/utils'
import type { ExtractPropTypes } from 'vue'
import type { SliderMarkerProps } from './marker'
import type Slider from './slider.vue'

type SliderMarks = Record<number, string | SliderMarkerProps['mark']>

export interface SliderInitData {
  firstValue: number
  secondValue: number
  oldValue?: Arrayable<number>
  dragging: boolean
  sliderSize: number
}

export const sliderProps = buildProps({
  debounce: {
    default: 300,
    type: Number,
  },
  disabled: Boolean,
  formatTooltip: {
    default: undefined,
    type: definePropType<(val: number) => number | string>(Function),
  },
  formatValueText: {
    default: undefined,
    type: definePropType<(val: number) => string>(Function),
  },
  height: String,
  id: {
    default: undefined,
    type: String,
  },
  inputSize: useSizeProp,
  label: {
    default: undefined,
    type: String,
  },
  marks: {
    type: definePropType<SliderMarks>(Object),
  },
  max: {
    default: 100,
    type: Number,
  },
  min: {
    default: 0,
    type: Number,
  },
  modelValue: {
    default: 0,
    type: definePropType<Arrayable<number>>([Number, Array]),
  },
  placement: {
    default: 'top',
    type: String,
    values: placements,
  },
  range: Boolean,
  rangeEndLabel: {
    default: undefined,
    type: String,
  },
  rangeStartLabel: {
    default: undefined,
    type: String,
  },
  showInput: Boolean,
  showInputControls: {
    default: true,
    type: Boolean,
  },
  showStops: Boolean,
  showTooltip: {
    default: true,
    type: Boolean,
  },
  size: useSizeProp,
  step: {
    default: 1,
    type: Number,
  },
  tooltipClass: {
    default: undefined,
    type: String,
  },
  validateEvent: {
    default: true,
    type: Boolean,
  },
  vertical: Boolean,
} as const)
export type SliderProps = ExtractPropTypes<typeof sliderProps>

function isValidValue(value: Arrayable<number>) {
  return isNumber(value) || (isArray(value) && value.every(isNumber))
}
export const sliderEmits = {
  [CHANGE_EVENT]: isValidValue,
  [INPUT_EVENT]: isValidValue,
  [UPDATE_MODEL_EVENT]: isValidValue,
}
export type SliderEmits = typeof sliderEmits

export type SliderInstance = InstanceType<typeof Slider>

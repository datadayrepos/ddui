import type { OptionProps, SelectProps } from './defaults'
import type { ExtractPropTypes, InjectionKey, Ref } from 'vue'
import type { Option } from './select.types'
import type { TooltipInstance } from '/@/components/tooltip'

export interface SelectV2Context {
  props: ExtractPropTypes<typeof SelectProps>
  expanded: boolean
  popper: Ref<TooltipInstance>
  onSelect: (option: Option, index: number, byClick?: boolean) => void
  onHover: (idx: number) => void
  onKeyboardNavigate: (direction: 'forward' | 'backward') => void
  onKeyboardSelect: () => void
}

export const selectV2InjectionKey: InjectionKey<SelectV2Context> = Symbol(
  'ElSelectV2Injection',
)
export type IOptionProps = ExtractPropTypes<typeof OptionProps>
export type ISelectProps = ExtractPropTypes<typeof SelectProps>

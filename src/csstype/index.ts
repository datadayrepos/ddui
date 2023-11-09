export type Globals = '-moz-initial' | 'inherit' | 'initial' | 'revert' | 'unset'

export type AlignItemsProperty = Globals | SelfPosition | 'baseline' | 'normal' | 'stretch' | string

export type ObjectFitProperty = Globals | 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'

type SelfPosition = 'center' | 'end' | 'flex-end' | 'flex-start' | 'self-end' | 'self-start' | 'start'

export type ZIndexProperty = Globals | 'auto' | number

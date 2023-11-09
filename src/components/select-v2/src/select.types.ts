type OptionCommon = Record<string, any>

export type Option = OptionCommon & {
  created?: boolean
}

export type OptionGroup = OptionCommon

export type OptionType = Option | OptionGroup

export interface OptionItemProps {
  item: any
  index: number
  disabled: boolean
}

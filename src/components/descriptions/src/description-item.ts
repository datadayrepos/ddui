import { defineComponent } from 'vue'
import { buildProps } from '/@/utils'

import type { ExtractPropTypes, Slot, VNode } from 'vue'

const descriptionItemProps = buildProps({
  /**
   * @description column content alignment (If no `border`, effective for both label and content)
   */
  align: {
    default: 'left',
    type: String,
  },
  /**
   * @description column content custom class name
   */
  className: {
    default: '',
    type: String,
  },
  /**
   * @description label text
   */
  label: {
    default: '',
    type: String,
  },
  /**
   * @description column label alignment, if omitted, the value of the above `align` attribute will be applied (If no `border`, please use `align` attribute)
   */
  labelAlign: {
    default: '',
    type: String,
  },
  /**
   * @description column label custom class name
   */
  labelClassName: {
    default: '',
    type: String,
  },
  /**
   * @description column minimum width, columns with `width` has a fixed width, while columns with `min-width` has a width that is distributed in proportion (If no`border`, width contains label and content)
   */
  minWidth: {
    default: '',
    type: [String, Number],
  },
  /**
   * @description colspan of column
   */
  span: {
    default: 1,
    type: Number,
  },
  /**
   * @description column width, the width of the same column in different rows is set by the max value (If no `border`, width contains label and content)
   */
  width: {
    default: '',
    type: [String, Number],
  },
})
const DescriptionItem = defineComponent({
  name: 'ElDescriptionsItem',
  props: descriptionItemProps,
})

export default DescriptionItem

type DescriptionItemProps = ExtractPropTypes<typeof descriptionItemProps>
export type DescriptionItemVNode = VNode & {
  children: { [name: string]: Slot } | null
  props: Partial<DescriptionItemProps> | null
}

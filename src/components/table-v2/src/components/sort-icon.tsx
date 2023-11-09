import ElIcon from '/@/components/icon'
import { SortDown, SortUp } from '@element-plus/icons-vue'
import type { FunctionalComponent } from 'vue'
import { SortOrder } from '../constants'

export interface SortIconProps {
  sortOrder: SortOrder
  class?: JSX.IntrinsicAttributes['class']
}

const SortIcon: FunctionalComponent<SortIconProps> = (props) => {
  const { sortOrder } = props

  return (
    <ElIcon size={14} class={props.class}>
      {sortOrder === SortOrder.ASC ? <SortUp /> : <SortDown />}
    </ElIcon>
  )
}

export default SortIcon

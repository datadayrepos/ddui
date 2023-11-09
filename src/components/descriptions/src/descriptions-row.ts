import { buildProps, definePropType } from '/@/utils'

import type { DescriptionItemVNode } from './description-item'

export const descriptionsRowProps = buildProps({
  row: {
    default: () => [],
    type: definePropType<DescriptionItemVNode[]>(Array),
  },
} as const)

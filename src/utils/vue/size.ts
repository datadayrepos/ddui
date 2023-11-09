import { componentSizeMap } from '../../constants'

import type { ComponentSize } from '../../constants'

export function getComponentSize(size?: ComponentSize) {
  return componentSizeMap[size || 'default']
}
// 2.4.2

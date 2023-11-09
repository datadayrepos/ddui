import { computed } from 'vue'
import { useNamespace } from '/@/hooks'
import useMenuColor from './use-menu-color'

import type { MenuProps } from './menu'

export function useMenuCssVar(props: MenuProps, level: number) {
  const ns = useNamespace('menu')
  return computed(() => {
    return ns.cssVarBlock({
      'active-color': props.activeTextColor || '',
      'bg-color': props.backgroundColor || '',
      'hover-bg-color': useMenuColor(props).value || '',
      'hover-text-color': props.textColor || '',
      'level': `${level}`,
      'text-color': props.textColor || '',
    })
  })
}

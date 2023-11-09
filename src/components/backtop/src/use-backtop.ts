import { onMounted, ref, shallowRef } from 'vue'
import { useEventListener } from '@datadayrepos/usevuecore'
import { useThrottleFn } from '@datadayrepos/usevueshared'
import { throwError } from '/@/utils'
import type { SetupContext } from 'vue'
import type { BacktopEmits, BacktopProps } from './backtop'

export function useBackTop(props: BacktopProps, emit: SetupContext<BacktopEmits>['emit'], componentName: string) {
  const el = shallowRef<HTMLElement>()
  const container = shallowRef<Document | HTMLElement>()
  const visible = ref(false)

  const handleScroll = () => {
    if (el.value)
      visible.value = el.value.scrollTop >= props.visibilityHeight
  }

  const handleClick = (event: MouseEvent) => {
    el.value?.scrollTo({ behavior: 'smooth', top: 0 })
    emit('click', event)
  }

  const handleScrollThrottled = useThrottleFn(handleScroll, 300, true)

  useEventListener(container, 'scroll', handleScrollThrottled)
  onMounted(() => {
    container.value = document
    el.value = document.documentElement

    if (props.target) {
      el.value = document.querySelector<HTMLElement>(props.target) ?? undefined
      if (!el.value)
        throwError(componentName, `target does not exist: ${props.target}`)

      container.value = el.value
    }
    // Give visible an initial value, fix #13066
    handleScroll()
  })

  return {
    handleClick,
    visible,
  }
}

import { defineComponent, inject, watch } from 'vue'
import { selectKey } from '/@/components/select'
import type { SelectContext } from '/@/components/select'
import type { PropType } from 'vue'

// same as el-option instance,
// these are required for `cachedOptions`
export interface CacheOption {
  value: string | number | boolean | object
  currentLabel: string | number
  isDisabled: boolean
}

export default defineComponent({
  props: {
    data: {
      default: () => [],
      type: Array as PropType<CacheOption[]>,
    },
  },
  setup(props) {
    const select = inject(selectKey) as NonNullable<SelectContext>

    watch(
      () => props.data,
      () => {
        props.data.forEach((item) => {
          if (!select.cachedOptions.has(item.value))
            select.cachedOptions.set(item.value, item)
        })

        // fork from packages/select/src/useSelect.ts#330
        const inputs = select.selectWrapper?.querySelectorAll('input') || []
        if (
          !Array.from(inputs).includes(
            document.activeElement as HTMLInputElement,
          )
        )
          select.setSelected()
      },
      { flush: 'post', immediate: true },
    )

    return () => undefined
  },
})

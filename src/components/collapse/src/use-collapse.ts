import { computed, provide, ref, watch } from 'vue'
import { ensureArray } from '/@/utils'
import { useNamespace } from '/@/hooks'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '/@/constants'
import type { SetupContext } from 'vue'
import { collapseContextKey } from './constants'

import type {
  CollapseActiveName,
  CollapseEmits,
  CollapseProps,
} from './collapse'

export function useCollapse(props: CollapseProps, emit: SetupContext<CollapseEmits>['emit']) {
  const activeNames = ref(ensureArray(props.modelValue))

  const setActiveNames = (_activeNames: CollapseActiveName[]) => {
    activeNames.value = _activeNames
    const value = props.accordion ? activeNames.value[0] : activeNames.value
    emit(UPDATE_MODEL_EVENT, value)
    emit(CHANGE_EVENT, value)
  }

  const handleItemClick = (name: CollapseActiveName) => {
    if (props.accordion) {
      setActiveNames([activeNames.value[0] === name ? '' : name])
    }
    else {
      const _activeNames = [...activeNames.value]
      const index = _activeNames.indexOf(name)

      if (index > -1)
        _activeNames.splice(index, 1)
      else
        _activeNames.push(name)

      setActiveNames(_activeNames)
    }
  }

  watch(
    () => props.modelValue,
    () => (activeNames.value = ensureArray(props.modelValue)),
    { deep: true },
  )

  provide(collapseContextKey, {
    activeNames,
    handleItemClick,
  })
  return {
    activeNames,
    setActiveNames,
  }
}

export function useCollapseDOM() {
  const ns = useNamespace('collapse')

  const rootKls = computed(() => ns.b())
  return {
    rootKls,
  }
}

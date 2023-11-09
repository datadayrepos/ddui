// @ts-nocheck
import { computed, nextTick, toRefs } from 'vue'
import { pick } from '@datadayrepos/lodashts'
import ElSelect from '/@/components/select'
import { useNamespace } from '/@/hooks'
import { UPDATE_MODEL_EVENT } from '/@/constants'
import type { Ref } from 'vue'
import type ElTree from '/@/components/tree'

export function useSelect(props, { attrs, emit }, {
  tree,
  key,
}: {
  select: Ref<InstanceType<typeof ElSelect> | undefined>
  tree: Ref<InstanceType<typeof ElTree> | undefined>
  key: Ref<string>
}) {
  const ns = useNamespace('tree-select')

  const result = {
    ...pick(toRefs(props), Object.keys(ElSelect.props)),
    ...attrs,
    'filterMethod': (keyword = '') => {
      if (props.filterMethod)
        props.filterMethod(keyword)

      nextTick(() => {
        // let tree node expand only, same with tree filter
        tree.value?.filter(keyword)
      })
    },
    // attrs is not reactive, when v-model binding source changes,
    // this listener is still old, see the bug(or test 'v-model source change'):
    // https://github.com/element-plus/element-plus/issues/14204
    'onUpdate:modelValue': value => emit(UPDATE_MODEL_EVENT, value),
    // clear filter text when visible change
    'onVisibleChange': (visible: boolean) => {
      attrs.onVisibleChange?.(visible)

      if (props.filterable && visible)
        result.filterMethod()
    },
    'popperClass': computed(() => {
      const classes = [ns.e('popper')]
      if (props.popperClass)
        classes.push(props.popperClass)
      return classes.join(' ')
    }),
    'valueKey': key,
  }

  return result
}

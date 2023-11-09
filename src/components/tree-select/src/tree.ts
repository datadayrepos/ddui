// @ts-nocheck
import { computed, nextTick, toRefs, watch } from 'vue'
import { isEqual, pick } from '@datadayrepos/lodashts'
import { UPDATE_MODEL_EVENT } from '/@/constants'
import { isFunction } from '/@/utils'
import ElTree from '/@/components/tree'
import TreeSelectOption from './tree-select-option'
import {
  isValidArray,
  isValidValue,
  toValidArray,
  treeEach,
  treeFind,
} from './utils'
import type { CacheOption } from './cache-options'
import type { Ref } from 'vue'
import type ElSelect from '/@/components/select'
import type Node from '/@/components/tree/src/model/node'
import type { TreeNodeData } from '/@/components/tree/src/tree.type'

export function useTree(props, { attrs, slots, emit }, {
  select,
  tree,
  key,
}: {
  select: Ref<InstanceType<typeof ElSelect> | undefined>
  tree: Ref<InstanceType<typeof ElTree> | undefined>
  key: Ref<string>
}) {
  watch(
    () => props.modelValue,
    () => {
      if (props.showCheckbox) {
        nextTick(() => {
          const treeInstance = tree.value
          if (
            treeInstance
            && !isEqual(
              treeInstance.getCheckedKeys(),
              toValidArray(props.modelValue),
            )
          )
            treeInstance.setCheckedKeys(toValidArray(props.modelValue))
        })
      }
    },
    {
      deep: true,
      immediate: true,
    },
  )

  const propsMap = computed(() => ({
    children: 'children',
    disabled: 'disabled',
    isLeaf: 'isLeaf',
    label: 'label',
    value: key.value,
    ...props.props,
  }))

  const getNodeValByProp = (
    prop: 'value' | 'label' | 'children' | 'disabled' | 'isLeaf',
    data: TreeNodeData,
  ) => {
    const propVal = propsMap.value[prop]
    if (isFunction(propVal)) {
      return propVal(
        data,
        tree.value?.getNode(getNodeValByProp('value', data)) as Node,
      )
    }
    else {
      return data[propVal as string]
    }
  }

  const defaultExpandedParentKeys = toValidArray(props.modelValue)
    .map((value) => {
      return treeFind(
        props.data || [],
        data => getNodeValByProp('value', data) === value,
        data => getNodeValByProp('children', data),
        (data, index, array, parent) => parent && getNodeValByProp('value', parent),
      )
    })
    .filter(item => isValidValue(item))

  const cacheOptions = computed(() => {
    if (!props.renderAfterExpand && !props.lazy)
      return []

    const options: CacheOption[] = []

    treeEach(
      props.data.concat(props.cacheData),
      (node) => {
        const value = getNodeValByProp('value', node)
        options.push({
          currentLabel: getNodeValByProp('label', node),
          isDisabled: getNodeValByProp('disabled', node),
          value,
        })
      },
      data => getNodeValByProp('children', data),
    )

    return options
  })

  const cacheOptionsMap = computed(() => {
    return cacheOptions.value.reduce(
      (prev, next) => ({ ...prev, [next.value]: next }),
      {},
    )
  })

  return {
    ...pick(toRefs(props), Object.keys(ElTree.props)),
    ...attrs,

    // else
    cacheOptions,

    // show current selected node only first time,
    // fix the problem of expanding multiple nodes when checking multiple nodes
    defaultExpandedKeys: computed(() => {
      return props.defaultExpandedKeys
        ? props.defaultExpandedKeys.concat(defaultExpandedParentKeys)
        : defaultExpandedParentKeys
    }),

    // only expand on click node when the `check-strictly` is false
    expandOnClickNode: computed(() => {
      return !props.checkStrictly && props.expandOnClickNode
    }),

    filterNodeMethod: (value, data, node) => {
      if (props.filterNodeMethod)
        return props.filterNodeMethod(value, data, node)
      if (!value)
        return true
      return getNodeValByProp('label', data)?.includes(value)
    },
    nodeKey: key,
    onCheck: (data, params) => {
      // ignore when no checkbox, like only `checkOnClickNode` is true
      if (!props.showCheckbox)
        return

      const dataValue = getNodeValByProp('value', data)

      // fix: checkedKeys has not cached keys
      const uncachedCheckedKeys = params.checkedKeys
      const cachedKeys = props.multiple
        ? toValidArray(props.modelValue).filter(
          item =>
            item in cacheOptionsMap.value
              && !tree.value.getNode(item)
              && !uncachedCheckedKeys.includes(item),
        )
        : []
      const checkedKeys = uncachedCheckedKeys.concat(cachedKeys)

      if (props.checkStrictly) {
        emit(
          UPDATE_MODEL_EVENT,
          // Checking for changes may come from `check-on-node-click`
          props.multiple
            ? checkedKeys
            : checkedKeys.includes(dataValue)
              ? dataValue
              : undefined,
        )
      }
      // only can select leaf node
      else {
        if (props.multiple) {
          emit(
            UPDATE_MODEL_EVENT,
            (tree.value as InstanceType<typeof ElTree>).getCheckedKeys(true),
          )
        }
        else {
          // select first leaf node when check parent
          const firstLeaf = treeFind(
            [data],
            data =>
              !isValidArray(getNodeValByProp('children', data))
              && !getNodeValByProp('disabled', data),
            data => getNodeValByProp('children', data),
          )
          const firstLeafKey = firstLeaf
            ? getNodeValByProp('value', firstLeaf)
            : undefined

          // unselect when any child checked
          const hasCheckedChild
            = isValidValue(props.modelValue)
            && !!treeFind(
              [data],
              data => getNodeValByProp('value', data) === props.modelValue,
              data => getNodeValByProp('children', data),
            )

          emit(
            UPDATE_MODEL_EVENT,
            firstLeafKey === props.modelValue || hasCheckedChild
              ? undefined
              : firstLeafKey,
          )
        }
      }

      nextTick(() => {
        const checkedKeys = toValidArray(props.modelValue)
        tree.value.setCheckedKeys(checkedKeys)

        attrs.onCheck?.(data, {
          checkedKeys: tree.value.getCheckedKeys(),
          checkedNodes: tree.value.getCheckedNodes(),
          halfCheckedKeys: tree.value.getHalfCheckedKeys(),
          halfCheckedNodes: tree.value.getHalfCheckedNodes(),
        })
      })
    },
    onNodeClick: (data, node, e) => {
      attrs.onNodeClick?.(data, node, e)

      // `onCheck` is trigger when `checkOnClickNode`
      if (props.showCheckbox && props.checkOnClickNode)
        return

      // now `checkOnClickNode` is false, only no checkbox and `checkStrictly` or `isLeaf`
      if (!props.showCheckbox && (props.checkStrictly || node.isLeaf)) {
        if (!getNodeValByProp('disabled', data)) {
          const option = select.value?.options.get(
            getNodeValByProp('value', data),
          )
          select.value?.handleOptionSelect(option)
        }
      }
      else if (props.expandOnClickNode) {
        e.proxy.handleExpandIconClick()
      }
    },
    renderContent: (h, { node, data, store }) => {
      return h(
        TreeSelectOption,
        {
          disabled: getNodeValByProp('disabled', data),
          label: getNodeValByProp('label', data),
          value: getNodeValByProp('value', data),
        },
        props.renderContent
          ? () => props.renderContent(h, { data, node, store })
          : slots.default
            ? () => slots.default({ data, node, store })
            : undefined,
      )
    },
  }
}

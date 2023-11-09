// @ts-nocheck
import { h } from 'vue'
import ElCheckbox from '/@/components/checkbox'
import { ElIcon } from '/@/components/icon'
import { ArrowRight, Loading } from '@element-plus/icons-vue'
import { getProp } from '/@/utils'

import type { VNode } from 'vue'
import type { TableColumnCtx } from './table-column/defaults'
import type { Store } from './store'
import type { TreeNode } from './table/defaults'

const defaultClassNames = {
  expand: 'table__expand-column',
  selection: 'table-column--selection',
}

export const cellStarts = {
  default: {
    order: '',
  },
  expand: {
    minWidth: 48,
    order: '',
    realWidth: 48,
    width: 48,
  },
  index: {
    minWidth: 48,
    order: '',
    realWidth: 48,
    width: 48,
  },
  selection: {
    minWidth: 48,
    order: '',
    realWidth: 48,
    width: 48,
  },
}

export function getDefaultClassName(type) {
  return defaultClassNames[type] || ''
}

// 这些选项不应该被覆盖
export const cellForced = {
  expand: {
    renderCell<T>({
      row,
      store,
      expanded,
    }: {
      row: T
      store: Store<T>
      expanded: boolean
    }) {
      const { ns } = store
      const classes = [ns.e('expand-icon')]
      if (expanded)
        classes.push(ns.em('expand-icon', 'expanded'))

      const callback = function (e: Event) {
        e.stopPropagation()
        store.toggleRowExpansion(row)
      }
      return h(
        'div',
        {
          class: classes,
          onClick: callback,
        },
        {
          default: () => {
            return [
              h(ElIcon, null, {
                default: () => {
                  return [h(ArrowRight)]
                },
              }),
            ]
          },
        },
      )
    },
    renderHeader<T>({ column }: { column: TableColumnCtx<T> }) {
      return column.label || ''
    },
    resizable: false,
    sortable: false,
  },
  index: {
    renderCell<T>({
      column,
      $index,
    }: {
      column: TableColumnCtx<T>
      $index: number
    }) {
      let i = $index + 1
      const index = column.index

      if (typeof index === 'number')
        i = $index + index
      else if (typeof index === 'function')
        i = index($index)

      return h('div', {}, [i])
    },
    renderHeader<T>({ column }: { column: TableColumnCtx<T> }) {
      return column.label || '#'
    },
    sortable: false,
  },
  selection: {
    renderCell<T>({
      row,
      column,
      store,
      $index,
    }: {
      row: T
      column: TableColumnCtx<T>
      store: Store<T>
      $index: string
    }) {
      return h(ElCheckbox, {
        ariaLabel: column.label,
        disabled: column.selectable
          ? !column.selectable.call(null, row, $index)
          : false,
        modelValue: store.isSelected(row),
        onChange: () => {
          store.commit('rowSelectedChanged', row)
        },
        onClick: (event: Event) => event.stopPropagation(),
        size: store.states.tableSize.value,
      })
    },
    renderHeader<T>({ store, column }: { store: Store<T> }) {
      function isDisabled() {
        return store.states.data.value && store.states.data.value.length === 0
      }
      return h(ElCheckbox, {
        'ariaLabel': column.label,
        'disabled': isDisabled(),
        'indeterminate':
          store.states.selection.value.length > 0
          && !store.states.isAllSelected.value,
        'modelValue': store.states.isAllSelected.value,
        'onUpdate:modelValue': store.toggleAllSelection,
        'size': store.states.tableSize.value,
      })
    },
    resizable: false,
    sortable: false,
  },
}

export function defaultRenderCell<T>({
  row,
  column,
  $index,
}: {
  row: T
  column: TableColumnCtx<T>
  $index: number
}) {
  const property = column.property
  const value = property && getProp(row, property).value
  if (column && column.formatter)
    return column.formatter(row, column, value, $index)

  return value?.toString?.() || ''
}

export function treeCellPrefix<T>(
  {
    row,
    treeNode,
    store,
  }: {
    row: T
    treeNode: TreeNode
    store: Store<T>
  },
  createPlaceholder = false,
) {
  const { ns } = store
  if (!treeNode) {
    if (createPlaceholder) {
      return [
        h('span', {
          class: ns.e('placeholder'),
        }),
      ]
    }
    return null
  }
  const ele: VNode[] = []
  const callback = function (e) {
    e.stopPropagation()
    if (treeNode.loading)
      return

    store.loadOrToggle(row)
  }
  if (treeNode.indent) {
    ele.push(
      h('span', {
        class: ns.e('indent'),
        style: { 'padding-left': `${treeNode.indent}px` },
      }),
    )
  }
  if (typeof treeNode.expanded === 'boolean' && !treeNode.noLazyChildren) {
    const expandClasses = [
      ns.e('expand-icon'),
      treeNode.expanded ? ns.em('expand-icon', 'expanded') : '',
    ]
    let icon = ArrowRight
    if (treeNode.loading)
      icon = Loading

    ele.push(
      h(
        'div',
        {
          class: expandClasses,
          onClick: callback,
        },
        {
          default: () => {
            return [
              h(
                ElIcon,
                { class: { [ns.is('loading')]: treeNode.loading } },
                {
                  default: () => [h(icon)],
                },
              ),
            ]
          },
        },
      ),
    )
  }
  else {
    ele.push(
      h('span', {
        class: ns.e('placeholder'),
      }),
    )
  }
  return ele
}

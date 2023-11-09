// @ts-nocheck
import { computed, h, inject } from 'vue'
import { merge } from '@datadayrepos/lodashts'
import { useNamespace } from '/@/hooks'
import { getRowIdentity } from '../util'
import { TABLE_INJECTION_KEY } from '../tokens'
import type { RenderRowData, TableProps, TreeNode } from '../table/defaults'
import useEvents from './events-helper'
import useStyles from './styles-helper'
import type { TableBodyProps } from './defaults'

function useRender<T>(props: Partial<TableBodyProps<T>>) {
  const parent = inject(TABLE_INJECTION_KEY)
  const ns = useNamespace('table')
  const {
    handleDoubleClick,
    handleClick,
    handleContextMenu,
    handleMouseEnter,
    handleMouseLeave,
    handleCellMouseEnter,
    handleCellMouseLeave,
    tooltipContent,
    tooltipTrigger,
  } = useEvents(props)
  const {
    getRowStyle,
    getRowClass,
    getCellStyle,
    getCellClass,
    getSpan,
    getColspanRealWidth,
  } = useStyles(props)
  const firstDefaultColumnIndex = computed(() => {
    return props.store.states.columns.value.findIndex(
      ({ type }) => type === 'default',
    )
  })
  const getKeyOfRow = (row: T, index: number) => {
    const rowKey = (parent.props as Partial<TableProps<T>>).rowKey
    if (rowKey)
      return getRowIdentity(row, rowKey)

    return index
  }
  const rowRender = (
    row: T,
    $index: number,
    treeRowData?: TreeNode,
    expanded = false,
  ) => {
    const { tooltipEffect, tooltipOptions, store } = props
    const { indent, columns } = store.states
    const rowClasses = getRowClass(row, $index)
    let display = true
    if (treeRowData) {
      rowClasses.push(ns.em('row', `level-${treeRowData.level}`))
      display = treeRowData.display
    }
    const displayStyle = display
      ? null
      : {
          display: 'none',
        }
    return h(
      'tr',
      {
        class: rowClasses,
        key: getKeyOfRow(row, $index),
        onClick: $event => handleClick($event, row),
        onContextmenu: $event => handleContextMenu($event, row),
        onDblclick: $event => handleDoubleClick($event, row),
        onMouseenter: () => handleMouseEnter($index),
        onMouseleave: handleMouseLeave,
        style: [displayStyle, getRowStyle(row, $index)],
      },
      columns.value.map((column, cellIndex) => {
        const { rowspan, colspan } = getSpan(row, column, $index, cellIndex)
        if (!rowspan || !colspan)
          return null

        const columnData = Object.assign({}, column)
        columnData.realWidth = getColspanRealWidth(
          columns.value,
          colspan,
          cellIndex,
        )
        const data: RenderRowData<T> = {
          $index,
          _self: props.context || parent,
          cellIndex,
          column: columnData,
          expanded,
          row,
          store: props.store,
        }
        if (cellIndex === firstDefaultColumnIndex.value && treeRowData) {
          data.treeNode = {
            indent: treeRowData.level * indent.value,
            level: treeRowData.level,
          }
          if (typeof treeRowData.expanded === 'boolean') {
            data.treeNode.expanded = treeRowData.expanded
            // 表明是懒加载
            if ('loading' in treeRowData)
              data.treeNode.loading = treeRowData.loading

            if ('noLazyChildren' in treeRowData)
              data.treeNode.noLazyChildren = treeRowData.noLazyChildren
          }
        }
        const baseKey = `${$index},${cellIndex}`
        const patchKey = columnData.columnKey || columnData.rawColumnKey || ''
        const tdChildren = cellChildren(cellIndex, column, data)
        const mergedTooltipOptions
          = column.showOverflowTooltip
          && merge(
            {
              effect: tooltipEffect,
            },
            tooltipOptions,
            column.showOverflowTooltip,
          )
        return h(
          'td',
          {
            class: getCellClass($index, cellIndex, row, column, colspan - 1),
            colspan,
            key: `${patchKey}${baseKey}`,
            onMouseenter: $event =>
              handleCellMouseEnter($event, row, mergedTooltipOptions),
            onMouseleave: handleCellMouseLeave,
            rowspan,
            style: getCellStyle($index, cellIndex, row, column),
          },
          [tdChildren],
        )
      }),
    )
  }
  const cellChildren = (cellIndex, column, data) => {
    return column.renderCell(data)
  }

  const wrappedRowRender = (row: T, $index: number) => {
    const store = props.store
    const { isRowExpanded, assertRowKey } = store
    const { treeData, lazyTreeNodeMap, childrenColumnName, rowKey }
      = store.states
    const columns = store.states.columns.value
    const hasExpandColumn = columns.some(({ type }) => type === 'expand')
    if (hasExpandColumn) {
      const expanded = isRowExpanded(row)
      const tr = rowRender(row, $index, undefined, expanded)
      const renderExpanded = parent.renderExpanded
      if (expanded) {
        if (!renderExpanded) {
          console.error('[Element Error]renderExpanded is required.')
          return tr
        }
        // 使用二维数组，避免修改 $index
        // Use a matrix to avoid modifying $index
        return [
          [
            tr,
            h(
              'tr',
              {
                key: `expanded-row__${tr.key as string}`,
              },
              [
                h(
                  'td',
                  {
                    class: `${ns.e('cell')} ${ns.e('expanded-cell')}`,
                    colspan: columns.length,
                  },
                  [renderExpanded({ $index, expanded, row, store })],
                ),
              ],
            ),
          ],
        ]
      }
      else {
        // 使用二维数组，避免修改 $index
        // Use a two dimensional array avoid modifying $index
        return [[tr]]
      }
    }
    else if (Object.keys(treeData.value).length) {
      assertRowKey()
      // TreeTable 时，rowKey 必须由用户设定，不使用 getKeyOfRow 计算
      // 在调用 rowRender 函数时，仍然会计算 rowKey，不太好的操作
      const key = getRowIdentity(row, rowKey.value)
      let cur = treeData.value[key]
      let treeRowData = null
      if (cur) {
        treeRowData = {
          display: true,
          expanded: cur.expanded,
          level: cur.level,
        }
        if (typeof cur.lazy === 'boolean') {
          if (typeof cur.loaded === 'boolean' && cur.loaded)
            treeRowData.noLazyChildren = !(cur.children && cur.children.length)

          treeRowData.loading = cur.loading
        }
      }
      const tmp = [rowRender(row, $index, treeRowData)]
      // 渲染嵌套数据
      if (cur) {
        // currentRow 记录的是 index，所以还需主动增加 TreeTable 的 index
        let i = 0
        const traverse = (children, parent) => {
          if (!(children && children.length && parent))
            return
          children.forEach((node) => {
            // 父节点的 display 状态影响子节点的显示状态
            const innerTreeRowData = {
              display: parent.display && parent.expanded,
              expanded: false,
              level: parent.level + 1,
              loading: false,
              noLazyChildren: false,
            }
            const childKey = getRowIdentity(node, rowKey.value)
            if (childKey === undefined || childKey === null)
              throw new Error('For nested data item, row-key is required.')

            cur = { ...treeData.value[childKey] }
            // 对于当前节点，分成有无子节点两种情况。
            // 如果包含子节点的，设置 expanded 属性。
            // 对于它子节点的 display 属性由它本身的 expanded 与 display 共同决定。
            if (cur) {
              innerTreeRowData.expanded = cur.expanded
              // 懒加载的某些节点，level 未知
              cur.level = cur.level || innerTreeRowData.level
              cur.display = !!(cur.expanded && innerTreeRowData.display)
              if (typeof cur.lazy === 'boolean') {
                if (typeof cur.loaded === 'boolean' && cur.loaded) {
                  innerTreeRowData.noLazyChildren = !(
                    cur.children && cur.children.length
                  )
                }
                innerTreeRowData.loading = cur.loading
              }
            }
            i++
            tmp.push(rowRender(node, $index + i, innerTreeRowData))
            if (cur) {
              const nodes
                = lazyTreeNodeMap.value[childKey]
                || node[childrenColumnName.value]
              traverse(nodes, cur)
            }
          })
        }
        // 对于 root 节点，display 一定为 true
        cur.display = true
        const nodes
          = lazyTreeNodeMap.value[key] || row[childrenColumnName.value]
        traverse(nodes, cur)
      }
      return tmp
    }
    else {
      return rowRender(row, $index, undefined)
    }
  }

  return {
    tooltipContent,
    tooltipTrigger,
    wrappedRowRender,
  }
}

export default useRender

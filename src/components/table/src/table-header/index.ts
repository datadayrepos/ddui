// @ts-nocheck
import {
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  nextTick,
  onMounted,
  ref,
} from 'vue'
import ElCheckbox from '/@/components/checkbox'
import { useNamespace } from '/@/hooks'
import type { ComponentInternalInstance, PropType, Ref } from 'vue'
import FilterPanel from '../filter-panel.vue'
import useLayoutObserver from '../layout-observer'
import { TABLE_INJECTION_KEY } from '../tokens'
import type { DefaultRow, Sort } from '../table/defaults'
import type { Store } from '../store'
import useEvent from './event-helper'
import useStyle from './style.helper'
import useUtils from './utils-helper'

export interface TableHeader extends ComponentInternalInstance {
  state: {
    onColumnsChange
    onScrollableChange
  }
  filterPanels: Ref<unknown>
}
export interface TableHeaderProps<T> {
  fixed: string
  store: Store<T>
  border: boolean
  defaultSort: Sort
}

export default defineComponent({
  components: {
    ElCheckbox,
  },
  name: 'ElTableHeader',
  props: {
    border: Boolean,
    defaultSort: {
      default: () => {
        return {
          order: '',
          prop: '',
        }
      },
      type: Object as PropType<TableHeaderProps<DefaultRow>['defaultSort']>,
    },
    fixed: {
      default: '',
      type: String,
    },
    store: {
      required: true,
      type: Object as PropType<TableHeaderProps<DefaultRow>['store']>,
    },
  },
  render() {
    const {
      ns,
      isGroup,
      columnRows,
      getHeaderCellStyle,
      getHeaderCellClass,
      getHeaderRowClass,
      getHeaderRowStyle,
      handleHeaderClick,
      handleHeaderContextMenu,
      handleMouseDown,
      handleMouseMove,
      handleSortClick,
      handleMouseOut,
      store,
      $parent,
    } = this
    let rowSpan = 1
    return h(
      'thead',
      {
        class: { [ns.is('group')]: isGroup },
      },
      columnRows.map((subColumns, rowIndex) => h(
        'tr',
        {
          class: getHeaderRowClass(rowIndex),
          key: rowIndex,
          style: getHeaderRowStyle(rowIndex),
        },
        subColumns.map((column, cellIndex) => {
          if (column.rowSpan > rowSpan)
            rowSpan = column.rowSpan

          return h(
            'th',
            {
              class: getHeaderCellClass(
                rowIndex,
                cellIndex,
                subColumns,
                column,
              ),
              colspan: column.colSpan,
              key: `${column.id}-thead`,
              onClick: $event => handleHeaderClick($event, column),
              onContextmenu: $event =>
                handleHeaderContextMenu($event, column),
              onMousedown: $event => handleMouseDown($event, column),
              onMousemove: $event => handleMouseMove($event, column),
              onMouseout: handleMouseOut,
              rowspan: column.rowSpan,
              style: getHeaderCellStyle(
                rowIndex,
                cellIndex,
                subColumns,
                column,
              ),
            },
            [
              h(
                'div',
                {
                  class: [
                    'cell',
                    column.filteredValue && column.filteredValue.length > 0
                      ? 'highlight'
                      : '',
                  ],
                },
                [
                  column.renderHeader
                    ? column.renderHeader({
                      $index: cellIndex,
                      _self: $parent,
                      column,
                      store,
                    })
                    : column.label,
                  column.sortable
                      && h(
                        'span',
                        {
                          class: 'caret-wrapper',
                          onClick: $event => handleSortClick($event, column),
                        },
                        [
                          h('i', {
                            class: 'sort-caret ascending',
                            onClick: $event =>
                              handleSortClick($event, column, 'ascending'),
                          }),
                          h('i', {
                            class: 'sort-caret descending',
                            onClick: $event =>
                              handleSortClick($event, column, 'descending'),
                          }),
                        ],
                      ),
                  column.filterable
                      && h(FilterPanel, {
                        column,
                        placement: column.filterPlacement || 'bottom-start',
                        store,
                        upDataColumn: (key, value) => {
                          column[key] = value
                        },
                      }),
                ],
              ),
            ],
          )
        }),
      ),
      ),
    )
  },
  setup(props, { emit }) {
    const instance = getCurrentInstance() as TableHeader
    const parent = inject(TABLE_INJECTION_KEY)
    const ns = useNamespace('table')
    const filterPanels = ref({})
    const { onColumnsChange, onScrollableChange } = useLayoutObserver(parent!)
    onMounted(async () => {
      // Need double await, because updateColumns is executed after nextTick for now
      await nextTick()
      await nextTick()
      const { prop, order } = props.defaultSort
      parent?.store.commit('sort', { init: true, order, prop })
    })
    const {
      handleHeaderClick,
      handleHeaderContextMenu,
      handleMouseDown,
      handleMouseMove,
      handleMouseOut,
      handleSortClick,
      handleFilterClick,
    } = useEvent(props as TableHeaderProps<unknown>, emit)
    const {
      getHeaderRowStyle,
      getHeaderRowClass,
      getHeaderCellStyle,
      getHeaderCellClass,
    } = useStyle(props as TableHeaderProps<unknown>)
    const { isGroup, toggleAllSelection, columnRows } = useUtils(
      props as TableHeaderProps<unknown>,
    )

    instance.state = {
      onColumnsChange,
      onScrollableChange,
    }
    instance.filterPanels = filterPanels

    return {
      columnRows,
      filterPanels,
      getHeaderCellClass,
      getHeaderCellStyle,
      getHeaderRowClass,
      getHeaderRowStyle,
      handleFilterClick,
      handleHeaderClick,
      handleHeaderContextMenu,
      handleMouseDown,
      handleMouseMove,
      handleMouseOut,
      handleSortClick,
      isGroup,
      ns,
      onColumnsChange,
      onScrollableChange,
      toggleAllSelection,
    }
  },
})

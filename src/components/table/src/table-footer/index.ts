// @ts-nocheck
import { defineComponent, h } from 'vue'
import { useNamespace } from '/@/hooks'
import type { PropType } from 'vue'
import type { Store } from '../store'

import type { DefaultRow, Sort, SummaryMethod } from '../table/defaults'
import useStyle from './style-helper'

export interface TableFooter<T> {
  fixed: string
  store: Store<T>
  summaryMethod: SummaryMethod<T>
  sumText: string
  border: boolean
  defaultSort: Sort
}

export default defineComponent({
  name: 'ElTableFooter',

  props: {
    border: Boolean,
    defaultSort: {
      default: () => {
        return {
          order: '',
          prop: '',
        }
      },
      type: Object as PropType<TableFooter<DefaultRow>['defaultSort']>,
    },
    fixed: {
      default: '',
      type: String,
    },
    store: {
      required: true,
      type: Object as PropType<TableFooter<DefaultRow>['store']>,
    },
    sumText: String,
    summaryMethod: Function as PropType<
      TableFooter<DefaultRow>['summaryMethod']
    >,
  },
  render() {
    const { columns, getCellStyles, getCellClasses, summaryMethod, sumText }
      = this
    const data = this.store.states.data.value
    let sums = []
    if (summaryMethod) {
      sums = summaryMethod({
        columns,
        data,
      })
    }
    else {
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = sumText
          return
        }
        const values = data.map(item => Number(item[column.property]))
        const precisions = []
        let notNumber = true
        values.forEach((value) => {
          if (!Number.isNaN(+value)) {
            notNumber = false
            const decimal = `${value}`.split('.')[1]
            precisions.push(decimal ? decimal.length : 0)
          }
        })
        const precision = Math.max.apply(null, precisions)
        if (!notNumber) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!Number.isNaN(+value)) {
              return Number.parseFloat(
                (prev + curr).toFixed(Math.min(precision, 20)),
              )
            }
            else {
              return prev
            }
          }, 0)
        }
        else {
          sums[index] = ''
        }
      })
    }
    return h(
      h('tfoot', [
        h('tr', {}, [
          ...columns.map((column, cellIndex) => h(
            'td',
            {
              class: getCellClasses(columns, cellIndex),
              colspan: column.colSpan,
              key: cellIndex,
              rowspan: column.rowSpan,
              style: getCellStyles(column, cellIndex),
            },
            [
              h(
                'div',
                {
                  class: ['cell', column.labelClassName],
                },
                [sums[cellIndex]],
              ),
            ],
          ),
          ),
        ]),
      ]),
    )
  },
  setup(props) {
    const { getCellClasses, getCellStyles, columns } = useStyle(
      props as TableFooter<DefaultRow>,
    )
    const ns = useNamespace('table')
    return {
      columns,
      getCellClasses,
      getCellStyles,
      ns,
    }
  },
})

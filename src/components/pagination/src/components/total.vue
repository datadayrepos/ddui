<template>
  <span :class="ns.e('total')" :disabled="disabled">
    {{
      t('el.pagination.total', {
        total,
      })
    }}
  </span>
</template>

<script lang="ts" setup>
import { useLocale, useNamespace } from '/@/hooks'
import { usePagination } from '../usePagination'
import { paginationTotalProps } from './total'

defineProps(paginationTotalProps)
defineOptions({
  name: 'ElPaginationTotal',
})
const { t } = useLocale()
const ns = useNamespace('pagination')
const { disabled } = usePagination()
</script>

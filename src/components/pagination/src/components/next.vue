<template>
  <button
    type="button"
    class="btn-next"
    :disabled="internalDisabled"
    :aria-label="nextText || t('el.pagination.next')"
    :aria-disabled="internalDisabled"
    @click="$emit('click', $event)"
  >
    <span v-if="nextText">{{ nextText }}</span>
    <ElIcon v-else>
      <component :is="nextIcon" />
    </ElIcon>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLocale } from '/@/hooks'
import { ElIcon } from '/@/components/icon'
import { paginationNextProps } from './next'

const props = defineProps(paginationNextProps)

defineEmits(['click'])

defineOptions({
  name: 'ElPaginationNext',
})

const { t } = useLocale()

const internalDisabled = computed(
  () =>
    props.disabled
    || props.currentPage === props.pageCount
    || props.pageCount === 0,
)
</script>

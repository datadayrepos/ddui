<template>
  <button
    type="button"
    class="btn-prev"
    :disabled="internalDisabled"
    :aria-label="prevText || t('el.pagination.prev')"
    :aria-disabled="internalDisabled"
    @click="$emit('click', $event)"
  >
    <span v-if="prevText">{{ prevText }}</span>
    <ElIcon v-else>
      <component :is="prevIcon" />
    </ElIcon>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLocale } from '/@/hooks'
import { ElIcon } from '/@/components/icon'
import { paginationPrevEmits, paginationPrevProps } from './prev'

const props = defineProps(paginationPrevProps)

defineEmits(paginationPrevEmits)

defineOptions({
  name: 'ElPaginationPrev',
})

const { t } = useLocale()

const internalDisabled = computed(
  () => props.disabled || props.currentPage <= 1,
)
</script>

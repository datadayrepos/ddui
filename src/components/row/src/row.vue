<script setup lang="ts">
import { computed, provide } from 'vue'
import { useNamespace } from '/@/hooks'
import type { CSSProperties } from 'vue'
import { rowContextKey } from './constants'
import { rowProps } from './row'

defineOptions({
  name: 'ElRow',
})

const props = defineProps(rowProps)

const ns = useNamespace('row')
const gutter = computed(() => props.gutter)

provide(rowContextKey, {
  gutter,
})

const style = computed(() => {
  const styles: CSSProperties = {}
  if (!props.gutter)
    return styles

  styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`
  return styles
})

const rowKls = computed(() => [
  ns.b(),
  ns.is(`justify-${props.justify}`, props.justify !== 'start'),
  ns.is(`align-${props.align}`, !!props.align),
])
</script>

<template>
  <component :is="tag" :class="rowKls" :style="style">
    <slot />
  </component>
</template>

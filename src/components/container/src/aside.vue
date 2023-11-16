<template>
  <aside :class="ns.b()" :style="style">
    <slot />
  </aside>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '/@/hooks'

import type { CSSProperties } from 'vue'

const props = defineProps({
  /**
   * @description width of the side section
   */
  width: {
    type: String,
    default: null,
  },
})
defineOptions({
  name: 'ElAside',
})
const ns = useNamespace('aside')
const style = computed(
  () =>
    (props.width ? ns.cssVarBlock({ width: props.width }) : {}) as CSSProperties,
)
</script>

<style lang="css" src="../../../styles/components/el-aside.css"></style>

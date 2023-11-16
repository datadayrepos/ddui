<template>
  <header :class="ns.b()" :style="style">
    <slot />
  </header>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '/@/hooks'

import type { CSSProperties } from 'vue'

const props = defineProps({
  /**
   * @description height of the header
   */
  height: {
    type: String,
    default: null,
  },
})

defineOptions({
  name: 'ElHeader',
})

const ns = useNamespace('header')
const style = computed(() => {
  return props.height
    ? (ns.cssVarBlock({
        height: props.height,
      }) as CSSProperties)
    : {}
})
</script>

<style lang="css" src="../../../styles/components/el-header.css"></style>

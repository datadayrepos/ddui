<template>
  <i :class="ns.b()" :style="style" v-bind="$attrs">
    <slot />
  </i>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { addUnit, isUndefined } from '/@/utils'
import { useNamespace } from '/@/hooks'
import type { CSSProperties } from 'vue'
import { iconProps } from './icon'

const props = defineProps(iconProps)
defineOptions({
  name: 'ElIcon',
  inheritAttrs: false,
})
const ns = useNamespace('icon')

const style = computed<CSSProperties>(() => {
  const { size, color } = props
  if (!size && !color)
    return {}

  return {
    'fontSize': isUndefined(size) ? undefined : addUnit(size),
    '--color': color,
  }
})
</script>

<style lang="css" src="../../../styles/components/el-icon.css"></style>

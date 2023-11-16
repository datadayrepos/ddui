<template>
  <footer :class="ns.b()" :style="style">
    <slot />
  </footer>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '/@/hooks'

import type { CSSProperties } from 'vue'

const props = defineProps({
  /**
   * @description height of the footer
   */
  height: {
    type: String,
    default: null,
  },
})
defineOptions({
  name: 'ElFooter',
})
const ns = useNamespace('footer')

const style = computed(
  () =>
    (props.height
      ? ns.cssVarBlock({ height: props.height })
      : {}) as CSSProperties,
)
</script>

<style lang="css" src="../../../styles/components/el-footer.css"></style>

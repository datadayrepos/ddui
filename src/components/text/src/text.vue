<template>
  <component
    :is="tag"
    :class="textKls"
    :style="{ '-webkit-line-clamp': lineClamp }"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '/@/hooks'
import { useFormSize } from '/@/components/form'
import { isUndefined } from '/@/utils'
import { textProps } from './text'

const props = defineProps(textProps)

defineOptions({
  name: 'ElText',
})

const textSize = useFormSize()
const ns = useNamespace('text')

const textKls = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.m(textSize.value),
  ns.is('truncated', props.truncated),
  ns.is('line-clamp', !isUndefined(props.lineClamp)),
])
</script>

<style lang="css" src="../../../styles/components/el-text.css"></style>

<template>
  <a
    :class="linkKls"
    :href="disabled || !href ? undefined : href"
    @click="handleClick"
  >
    <ElIcon v-if="icon"><component :is="icon" /></ElIcon>
    <span v-if="$slots.default" :class="ns.e('inner')">
      <slot />
    </span>

    <slot v-if="$slots.icon" name="icon" />
  </a>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ElIcon } from '/@/components/icon'
import { useNamespace } from '/@/hooks'
import { linkEmits, linkProps } from './link'

const props = defineProps(linkProps)
const emit = defineEmits(linkEmits)
defineOptions({
  name: 'ElLink',
})
const ns = useNamespace('link')

const linkKls = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.is('disabled', props.disabled),
  ns.is('underline', props.underline && !props.disabled),
])

function handleClick(event: MouseEvent) {
  if (!props.disabled)
    emit('click', event)
}
</script>

<style lang="css" src="../../../styles/components/el-link.css"></style>

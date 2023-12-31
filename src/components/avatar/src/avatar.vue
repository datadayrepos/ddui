<template>
  <span :class="avatarClass" :style="sizeStyle">
    <img
      v-if="(src || srcSet) && !hasLoadError"
      :src="src"
      :alt="alt"
      :srcset="srcSet"
      :style="fitStyle"
      @error="handleError"
    >
    <ElIcon v-else-if="icon">
      <component :is="icon" />
    </ElIcon>
    <slot v-else />
  </span>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { ElIcon } from '/@/components/icon'
import { useNamespace } from '/@/hooks'
import { addUnit, isNumber, isString } from '/@/utils'
import type { CSSProperties } from 'vue'
import { avatarEmits, avatarProps } from './avatar'

const props = defineProps(avatarProps)

const emit = defineEmits(avatarEmits)

defineOptions({
  name: 'ElAvatar',
})

const ns = useNamespace('avatar')

const hasLoadError = ref(false)

const avatarClass = computed(() => {
  const { size, icon, shape } = props
  const classList = [ns.b()]
  if (isString(size))
    classList.push(ns.m(size))
  if (icon)
    classList.push(ns.m('icon'))
  if (shape)
    classList.push(ns.m(shape))
  return classList
})

const sizeStyle = computed(() => {
  const { size } = props
  return isNumber(size)
    ? (ns.cssVarBlock({
        size: addUnit(size) || '',
      }) as CSSProperties)
    : undefined
})

const fitStyle = computed<CSSProperties>(() => ({
  objectFit: props.fit,
}))

// need reset hasLoadError to false if src changed
watch(
  () => props.src,
  () => (hasLoadError.value = false),
)

function handleError(e: Event) {
  hasLoadError.value = true
  emit('error', e)
}
</script>

<style lang="css" src="../../../styles/components/el-avatar.css"></style>

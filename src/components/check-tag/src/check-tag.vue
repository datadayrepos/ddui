<script lang="ts" setup>
import { computed } from 'vue'
import { CHANGE_EVENT } from '/@/constants'
import { useNamespace } from '/@/hooks'
import { checkTagEmits, checkTagProps } from './check-tag'

defineOptions({
  name: 'ElCheckTag',
})
const props = defineProps(checkTagProps)
const emit = defineEmits(checkTagEmits)

const ns = useNamespace('check-tag')
const containerKls = computed(() => [ns.b(), ns.is('checked', props.checked)])

function handleChange() {
  const checked = !props.checked
  emit(CHANGE_EVENT, checked)
  emit('update:checked', checked)
}
</script>

<template>
  <span :class="containerKls" @click="handleChange">
    <slot />
  </span>
</template>

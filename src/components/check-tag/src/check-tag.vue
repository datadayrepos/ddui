<template>
  <span :class="containerKls" @click="handleChange">
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { CHANGE_EVENT } from '/@/constants'
import { useNamespace } from '/@/hooks'
import { checkTagEmits, checkTagProps } from './check-tag'

const props = defineProps(checkTagProps)
const emit = defineEmits(checkTagEmits)
defineOptions({
  name: 'ElCheckTag',
})
const ns = useNamespace('check-tag')
const containerKls = computed(() => [ns.b(), ns.is('checked', props.checked)])

function handleChange() {
  const checked = !props.checked
  emit(CHANGE_EVENT, checked)
  emit('update:checked', checked)
}
</script>

<style lang="css" src="../../../styles/components/el-check-tag.css"></style>

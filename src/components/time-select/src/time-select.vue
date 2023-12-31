<template>
  <ElSelect
    ref="select"
    :model-value="value"
    :disabled="_disabled"
    :clearable="clearable"
    :clear-icon="clearIcon"
    :size="size"
    :effect="effect"
    :placeholder="placeholder"
    default-first-option
    :filterable="editable"
    @update:model-value="(event) => $emit('update:modelValue', event)"
    @change="(event) => $emit('change', event)"
    @blur="(event) => $emit('blur', event)"
    @focus="(event) => $emit('focus', event)"
  >
    <ElOption
      v-for="item in items"
      :key="item.value"
      :label="item.value"
      :value="item.value"
      :disabled="item.disabled"
    />
    <template #prefix>
      <ElIcon v-if="prefixIcon" :class="nsInput.e('prefix-icon')">
        <component :is="prefixIcon" />
      </ElIcon>
    </template>
  </ElSelect>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import ElSelect from '/@/components/select'
import { useFormDisabled } from '/@/components/form'
import ElIcon from '/@/components/icon'
import { useLocale, useNamespace } from '/@/hooks'
import { timeSelectProps } from './time-select'
import { compareTime, formatTime, nextTime, parseTime } from './utils'

const props = defineProps(timeSelectProps)

defineEmits(['change', 'blur', 'focus', 'update:modelValue'])

defineOptions({
  name: 'ElTimeSelect',
})

dayjs.extend(customParseFormat)

const { Option: ElOption } = ElSelect

const nsInput = useNamespace('input')
const select = ref<typeof ElSelect>()

const _disabled = useFormDisabled()
const { lang } = useLocale()

const value = computed(() => props.modelValue)
const start = computed(() => {
  const time = parseTime(props.start)
  return time ? formatTime(time) : null
})

const end = computed(() => {
  const time = parseTime(props.end)
  return time ? formatTime(time) : null
})

const step = computed(() => {
  const time = parseTime(props.step)
  return time ? formatTime(time) : null
})

const minTime = computed(() => {
  const time = parseTime(props.minTime || '')
  return time ? formatTime(time) : null
})

const maxTime = computed(() => {
  const time = parseTime(props.maxTime || '')
  return time ? formatTime(time) : null
})

const items = computed(() => {
  const result: { value: string; disabled: boolean }[] = []
  if (props.start && props.end && props.step) {
    let current = start.value
    let currentTime: string
    while (current && end.value && compareTime(current, end.value) <= 0) {
      currentTime = dayjs(current, 'HH:mm')
        .locale(lang.value)
        .format(props.format)
      result.push({
        value: currentTime,
        disabled:
          compareTime(current, minTime.value || '-1:-1') <= 0
          || compareTime(current, maxTime.value || '100:100') >= 0,
      })
      current = nextTime(current, step.value!)
    }
  }
  return result
})

function blur() {
  select.value?.blur?.()
}

function focus() {
  select.value?.focus?.()
}

defineExpose({
  /**
   * @description focus the Input component
   */
  blur,
  /**
   * @description blur the Input component
   */
  focus,
})
</script>

<style lang="css" src="../../../styles/components/el-time-select.css"></style>

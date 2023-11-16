<template>
  <div :class="[ns.b(), ns.m(simple ? 'simple' : direction)]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, provide, watch } from 'vue'
import { CHANGE_EVENT } from '/@/constants'
import { useNamespace, useOrderedChildren } from '/@/hooks'
import { stepsEmits, stepsProps } from './steps'

import type { StepItemState } from './item.vue'

const props = defineProps(stepsProps)

const emit = defineEmits(stepsEmits)

defineOptions({
  name: 'ElSteps',
})

const ns = useNamespace('steps')
const {
  children: steps,
  addChild: addStep,
  removeChild: removeStep,
} = useOrderedChildren<StepItemState>(getCurrentInstance()!, 'ElStep')

watch(steps, () => {
  steps.value.forEach((instance: StepItemState, index: number) => {
    instance.setIndex(index)
  })
})

provide('ElSteps', { props, steps, addStep, removeStep })

watch(
  () => props.active,
  (newVal: number, oldVal: number) => {
    emit(CHANGE_EVENT, newVal, oldVal)
  },
)
</script>

<style lang="css" src="../../../styles/components/el-steps.css"></style>

<template>
  <ElTooltip
    ref="tooltipRef"
    v-bind="$attrs"
    :trigger="trigger"
    :placement="placement"
    :disabled="disabled"
    :visible="visible"
    :transition="transition"
    :popper-options="popperOptions"
    :tabindex="tabindex"
    :content="content"
    :offset="offset"
    :show-after="showAfter"
    :hide-after="hideAfter"
    :auto-close="autoClose"
    :show-arrow="showArrow"
    :aria-label="title"
    :effect="effect"
    :enterable="enterable"
    :popper-class="kls"
    :popper-style="style"
    :teleported="teleported"
    :persistent="persistent"
    :gpu-acceleration="gpuAcceleration"
    @update:visible="onUpdateVisible"
    @before-show="beforeEnter"
    @before-hide="beforeLeave"
    @show="afterEnter"
    @hide="afterLeave"
  >
    <template v-if="$slots.reference">
      <slot name="reference" />
    </template>

    <template #content>
      <div v-if="title" :class="ns.e('title')" role="title">
        {{ title }}
      </div>
      <slot>
        {{ content }}
      </slot>
    </template>
  </ElTooltip>
</template>

<script lang="ts" setup>
import { computed, ref, unref } from 'vue'
import { ElTooltip } from '/@/components/tooltip'
import { addUnit } from '/@/utils'
import { useNamespace } from '/@/hooks'
import { popoverEmits, popoverProps } from './popover'
import type { TooltipInstance } from '/@/components/tooltip'

const props = defineProps(popoverProps)

const emit = defineEmits(popoverEmits)

defineOptions({
  name: 'ElPopover',
})

const updateEventKeyRaw = `onUpdate:visible` as const

const onUpdateVisible = computed(() => {
  return props[updateEventKeyRaw]
})

const ns = useNamespace('popover')
const tooltipRef = ref<TooltipInstance>()
const popperRef = computed(() => {
  return unref(tooltipRef)?.popperRef
})

const style = computed(() => {
  return [
    {
      width: addUnit(props.width),
    },
    props.popperStyle!,
  ]
})

const kls = computed(() => {
  return [ns.b(), props.popperClass!, { [ns.m('plain')]: !!props.content }]
})

const gpuAcceleration = computed(() => {
  return props.transition === `${ns.namespace.value}-fade-in-linear`
})

function hide() {
  tooltipRef.value?.hide()
}

function beforeEnter() {
  emit('before-enter')
}
function beforeLeave() {
  emit('before-leave')
}

function afterEnter() {
  emit('after-enter')
}

function afterLeave() {
  emit('update:visible', false)
  emit('after-leave')
}

defineExpose({
  /** @description popper ref */
  popperRef,
  /** @description hide popover */
  hide,
})
</script>

<style lang="css" src="../../../styles/components/el-popover.css"></style>

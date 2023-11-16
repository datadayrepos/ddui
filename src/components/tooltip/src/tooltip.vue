<template>
  <ElPopper ref="popperRef" :role="role">
    <ElTooltipTrigger
      :disabled="disabled"
      :trigger="trigger"
      :trigger-keys="triggerKeys"
      :virtual-ref="virtualRef"
      :virtual-triggering="virtualTriggering"
    >
      <slot v-if="$slots.default" />
    </ElTooltipTrigger>
    <ElTooltipContent
      ref="contentRef"
      :aria-label="ariaLabel"
      :boundaries-padding="boundariesPadding"
      :content="content"
      :disabled="disabled"
      :effect="effect"
      :enterable="enterable"
      :fallback-placements="fallbackPlacements"
      :hide-after="hideAfter"
      :gpu-acceleration="gpuAcceleration"
      :offset="offset"
      :persistent="persistent"
      :popper-class="popperClass"
      :popper-style="popperStyle"
      :placement="placement"
      :popper-options="popperOptions"
      :pure="pure"
      :raw-content="rawContent"
      :reference-el="referenceEl"
      :trigger-target-el="triggerTargetEl"
      :show-after="showAfter"
      :strategy="strategy"
      :teleported="teleported"
      :transition="transition"
      :virtual-triggering="virtualTriggering"
      :z-index="zIndex"
      :append-to="appendTo"
    >
      <slot name="content">
        <span v-if="rawContent" v-html="content" />
        <span v-else>{{ content }}</span>
      </slot>
      <ElPopperArrow v-if="showArrow" :arrow-offset="arrowOffset" />
    </ElTooltipContent>
  </ElPopper>
</template>

<script lang="ts" setup>
import {
  computed,
  onDeactivated,
  provide,
  readonly,
  ref,
  toRef,
  unref,
  watch,
} from 'vue'
import { ElPopper, ElPopperArrow } from '/@/components/popper'

import { isBoolean } from '/@/utils'
import {
  useDelayedToggle,
  useId,
  usePopperContainer,
} from '/@/hooks'
import { TOOLTIP_INJECTION_KEY } from './constants'
import { tooltipEmits, useTooltipModelToggle, useTooltipProps } from './tooltip'
import ElTooltipTrigger from './trigger.vue'
import ElTooltipContent from './content.vue'
import type { PopperInstance } from '/@/components/popper'

const props = defineProps(useTooltipProps)

const emit = defineEmits(tooltipEmits)

defineOptions({
  name: 'ElTooltip',
})

usePopperContainer()

const id = useId()
const popperRef = ref<PopperInstance>()
// TODO any is temporary, replace with `TooltipContentInstance` later
const contentRef = ref<any>()

function updatePopper() {
  const popperComponent = unref(popperRef)
  if (popperComponent)
    popperComponent.popperInstanceRef?.update()
}
const open = ref(false)
const toggleReason = ref<Event>()

const { show, hide, hasUpdateHandler } = useTooltipModelToggle({
  indicator: open,
  toggleReason,
})

const { onOpen, onClose } = useDelayedToggle({
  showAfter: toRef(props, 'showAfter'),
  hideAfter: toRef(props, 'hideAfter'),
  autoClose: toRef(props, 'autoClose'),
  open: show,
  close: hide,
})

const controlled = computed(
  () => isBoolean(props.visible) && !hasUpdateHandler.value,
)

provide(TOOLTIP_INJECTION_KEY, {
  controlled,
  id,
  open: readonly(open),
  trigger: toRef(props, 'trigger'),
  onOpen: (event?: Event) => {
    onOpen(event)
  },
  onClose: (event?: Event) => {
    onClose(event)
  },
  onToggle: (event?: Event) => {
    if (unref(open))
      onClose(event)
    else
      onOpen(event)
  },
  onShow: () => {
    emit('show', toggleReason.value)
  },
  onHide: () => {
    emit('hide', toggleReason.value)
  },
  onBeforeShow: () => {
    emit('before-show', toggleReason.value)
  },
  onBeforeHide: () => {
    emit('before-hide', toggleReason.value)
  },
  updatePopper,
})

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled && open.value)
      open.value = false
  },
)

function isFocusInsideContent(event?: FocusEvent) {
  const popperContent: HTMLElement | undefined
    = contentRef.value?.contentRef?.popperContentRef
  const activeElement = (event?.relatedTarget as Node) || document.activeElement

  return popperContent && popperContent.contains(activeElement)
}

onDeactivated(() => open.value && hide())

defineExpose({
  /**
   * @description el-popper component instance
   */
  popperRef,
  /**
   * @description el-tooltip-content component instance
   */
  contentRef,
  /**
   * @description validate current focus event is trigger inside el-tooltip-content
   */
  isFocusInsideContent,
  /**
   * @description update el-popper component instance
   */
  updatePopper,
  /**
   * @description expose onOpen function to mange el-tooltip open state
   */
  onOpen,
  /**
   * @description expose onOpen function to mange el-tooltip open state
   */
  onClose,
  /**
   * @description expose hide function
   */
  hide,
})
</script>

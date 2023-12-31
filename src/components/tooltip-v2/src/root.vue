<template>
  <slot :open="open" />
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  unref,
  watch,
} from 'vue'
import { useTimeoutFn } from '@datadayrepos/usevueshared'
import { useId, useNamespace } from '/@/hooks'
import { isNumber, isPropAbsent } from '/@/utils'
import { TOOLTIP_V2_OPEN, tooltipV2RootKey } from './constants'
import { tooltipV2RootProps } from './root'

const props = defineProps(tooltipV2RootProps)

defineOptions({
  name: 'ElTooltipV2Root',
})

/**
 * internal open state, when no model value was provided, use this as indicator instead
 */
const _open = ref(props.defaultOpen)
const triggerRef = ref<HTMLElement | null>(null)

const open = computed<boolean>({
  get: () => (isPropAbsent(props.open) ? _open.value : props.open),
  set: (open) => {
    _open.value = open
    props['onUpdate:open']?.(open)
  },
})

const isOpenDelayed = computed(
  () => isNumber(props.delayDuration) && props.delayDuration > 0,
)

const { start: onDelayedOpen, stop: clearTimer } = useTimeoutFn(
  () => {
    open.value = true
  },
  computed(() => props.delayDuration),
  {
    immediate: false,
  },
)

const ns = useNamespace('tooltip-v2')

const contentId = useId()

function onNormalOpen() {
  clearTimer()
  open.value = true
}

function onDelayOpen() {
  unref(isOpenDelayed) ? onDelayedOpen() : onNormalOpen()
}

const onOpen = onNormalOpen

function onClose() {
  clearTimer()
  open.value = false
}

function onChange(open: boolean) {
  if (open) {
    document.dispatchEvent(new CustomEvent(TOOLTIP_V2_OPEN))
    onOpen()
  }

  props.onOpenChange?.(open)
}

watch(open, onChange)

onMounted(() => {
  // Keeps only 1 tooltip open at a time
  document.addEventListener(TOOLTIP_V2_OPEN, onClose)
})

onBeforeUnmount(() => {
  clearTimer()
  document.removeEventListener(TOOLTIP_V2_OPEN, onClose)
})

provide(tooltipV2RootKey, {
  contentId,
  triggerRef,
  ns,

  onClose,
  onDelayOpen,
  onOpen,
})

defineExpose({
  /**
   * @description open tooltip programmatically
   */
  onOpen,

  /**
   * @description close tooltip programmatically
   */
  onClose,
})
</script>

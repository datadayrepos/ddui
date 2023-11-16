<template>
  <ElTooltip
    ref="tooltipRef"
    trigger="click"
    effect="light"
    v-bind="$attrs"
    :popper-class="`${ns.namespace.value}-popover`"
    :popper-style="style"
    :teleported="teleported"
    :fallback-placements="['bottom', 'top', 'right', 'left']"
    :hide-after="hideAfter"
    :persistent="persistent"
  >
    <template #content>
      <div :class="ns.b()">
        <div :class="ns.e('main')">
          <ElIcon
            v-if="!hideIcon && icon"
            :class="ns.e('icon')"
            :style="{ color: iconColor }"
          >
            <component :is="icon" />
          </ElIcon>
          {{ title }}
        </div>
        <div :class="ns.e('action')">
          <ElButton
            size="small"
            :type="cancelButtonType === 'text' ? '' : cancelButtonType"
            :text="cancelButtonType === 'text'"
            @click="cancel"
          >
            {{ finalCancelButtonText }}
          </ElButton>
          <ElButton
            size="small"
            :type="confirmButtonType === 'text' ? '' : confirmButtonType"
            :text="confirmButtonType === 'text'"
            @click="confirm"
          >
            {{ finalConfirmButtonText }}
          </ElButton>
        </div>
      </div>
    </template>
    <template v-if="$slots.reference">
      <slot name="reference" />
    </template>
  </ElTooltip>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import ElButton from '/@/components/button'
import ElIcon from '/@/components/icon'
import ElTooltip from '/@/components/tooltip'
import { useLocale, useNamespace } from '/@/hooks'
import { addUnit } from '/@/utils'
import { popconfirmEmits, popconfirmProps } from './popconfirm'

import type { TooltipInstance } from '/@/components/tooltip'

const props = defineProps(popconfirmProps)

const emit = defineEmits(popconfirmEmits)

defineOptions({
  name: 'ElPopconfirm',
})

const { t } = useLocale()
const ns = useNamespace('popconfirm')
const tooltipRef = ref<TooltipInstance>()

function hidePopper() {
  tooltipRef.value?.onClose?.()
}

const style = computed(() => {
  return {
    width: addUnit(props.width),
  }
})

function confirm(e: MouseEvent) {
  emit('confirm', e)
  hidePopper()
}
function cancel(e: MouseEvent) {
  emit('cancel', e)
  hidePopper()
}

const finalConfirmButtonText = computed(
  () => props.confirmButtonText || t('el.popconfirm.confirmButtonText'),
)
const finalCancelButtonText = computed(
  () => props.cancelButtonText || t('el.popconfirm.cancelButtonText'),
)
</script>

<style lang="css" src="../../../styles/components/el-popconfirm.css"></style>

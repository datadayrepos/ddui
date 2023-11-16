<template>
  <transition
    :name="ns.b('fade')"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div
      v-show="visible"
      :id="id"
      ref="messageRef"
      :class="[
        ns.b(),
        { [ns.m(type)]: type && !icon },
        ns.is('center', center),
        ns.is('closable', showClose),
        customClass,
      ]"
      :style="customStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <ElBadge
        v-if="repeatNum > 1"
        :value="repeatNum"
        :type="badgeType"
        :class="ns.e('badge')"
      />
      <ElIcon v-if="iconComponent" :class="[ns.e('icon'), typeClass]">
        <component :is="iconComponent" />
      </ElIcon>
      <slot>
        <p v-if="!dangerouslyUseHTMLString" :class="ns.e('content')">
          {{ message }}
        </p>
        <!-- Caution here, message could've been compromised, never use user's input as message -->
        <p v-else :class="ns.e('content')" v-html="message" />
      </slot>
      <ElIcon v-if="showClose" :class="ns.e('closeBtn')" @click.stop="close">
        <Close />
      </ElIcon>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useEventListener, useResizeObserver } from '@datadayrepos/usevuecore'
import { useTimeoutFn } from '@datadayrepos/usevueshared'

import { TypeComponents, TypeComponentsMap } from '/@/utils'
import { EVENT_CODE } from '/@/constants'
import ElBadge from '/@/components/badge'
import { useGlobalComponentSettings } from '/@/components/config-provider'
import { ElIcon } from '/@/components/icon'
import type { CSSProperties } from 'vue'
import { messageEmits, messageProps } from './message'
import { getLastOffset, getOffsetOrSpace } from './instance'
import type { BadgeProps } from '/@/components/badge'

const props = defineProps(messageProps)

defineEmits(messageEmits)

defineOptions({
  name: 'ElMessage',
})

const { Close } = TypeComponents

const { ns, zIndex } = useGlobalComponentSettings('message')
const { currentZIndex, nextZIndex } = zIndex

const messageRef = ref<HTMLDivElement>()
const visible = ref(false)
const height = ref(0)

let stopTimer: (() => void) | undefined

const badgeType = computed<BadgeProps['type']>(() =>
  props.type ? (props.type === 'error' ? 'danger' : props.type) : 'info',
)
const typeClass = computed(() => {
  const type = props.type
  return { [ns.bm('icon', type)]: type && TypeComponentsMap[type] }
})
const iconComponent = computed(
  () => props.icon || TypeComponentsMap[props.type] || '',
)

const lastOffset = computed(() => getLastOffset(props.id))
const offset = computed(
  () => getOffsetOrSpace(props.id, props.offset) + lastOffset.value,
)
const bottom = computed((): number => height.value + offset.value)
const customStyle = computed<CSSProperties>(() => ({
  top: `${offset.value}px`,
  zIndex: currentZIndex.value,
}))

function startTimer() {
  if (props.duration === 0)
    return
  ;({ stop: stopTimer } = useTimeoutFn(() => {
    close()
  }, props.duration))
}

function clearTimer() {
  stopTimer?.()
}

function close() {
  visible.value = false
}

function keydown({ code }: KeyboardEvent) {
  if (code === EVENT_CODE.esc) {
    // press esc to close the message
    close()
  }
}

onMounted(() => {
  startTimer()
  nextZIndex()
  visible.value = true
})

watch(
  () => props.repeatNum,
  () => {
    clearTimer()
    startTimer()
  },
)

useEventListener(document, 'keydown', keydown)

useResizeObserver(messageRef, () => {
  height.value = messageRef.value!.getBoundingClientRect().height
})

defineExpose({
  visible,
  bottom,
  close,
})
</script>

<style lang="css" src="../../../styles/components/el-message.css"></style>

<template>
  <transition
    :name="ns.b('fade')"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div
      v-show="visible"
      :id="id"
      :class="[ns.b(), customClass, horizontalClass]"
      :style="positionStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      @click="onClick"
    >
      <ElIcon v-if="iconComponent" :class="[ns.e('icon'), typeClass]">
        <component :is="iconComponent" />
      </ElIcon>
      <div :class="ns.e('group')">
        <h2 :class="ns.e('title')" v-text="title" />
        <div
          v-show="message"
          :class="ns.e('content')"
          :style="!!title ? undefined : { margin: 0 }"
        >
          <slot>
            <p v-if="!dangerouslyUseHTMLString">
              {{ message }}
            </p>
            <!-- Caution here, message could've been compromised, never use user's input as message -->
            <p v-else v-html="message" />
          </slot>
        </div>
        <ElIcon v-if="showClose" :class="ns.e('closeBtn')" @click.stop="close">
          <Close />
        </ElIcon>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useEventListener } from '@datadayrepos/usevuecore'
import { useTimeoutFn } from '@datadayrepos/usevueshared'

import { CloseComponents, TypeComponentsMap } from '/@/utils'
import { EVENT_CODE } from '/@/constants'
import { ElIcon } from '/@/components/icon'
import { useGlobalComponentSettings } from '/@/components/config-provider'
import type { CSSProperties } from 'vue'
import { notificationEmits, notificationProps } from './notification'

const props = defineProps(notificationProps)

defineEmits(notificationEmits)

defineOptions({
  name: 'ElNotification',
})

const { ns, zIndex } = useGlobalComponentSettings('notification')
const { nextZIndex, currentZIndex } = zIndex

const { Close } = CloseComponents

const visible = ref(false)
let timer: (() => void) | undefined

const typeClass = computed(() => {
  const type = props.type
  return type && TypeComponentsMap[props.type] ? ns.m(type) : ''
})

const iconComponent = computed(() => {
  if (!props.type)
    return props.icon
  return TypeComponentsMap[props.type] || props.icon
})

const horizontalClass = computed(() =>
  props.position.endsWith('right') ? 'right' : 'left',
)

const verticalProperty = computed(() =>
  props.position.startsWith('top') ? 'top' : 'bottom',
)

const positionStyle = computed<CSSProperties>(() => {
  return {
    [verticalProperty.value]: `${props.offset}px`,
    zIndex: props.zIndex ?? currentZIndex.value,
  }
})

function startTimer() {
  if (props.duration > 0) {
    ;({ stop: timer } = useTimeoutFn(() => {
      if (visible.value)
        close()
    }, props.duration))
  }
}

function clearTimer() {
  timer?.()
}

function close() {
  visible.value = false
}

function onKeydown({ code }: KeyboardEvent) {
  if (code === EVENT_CODE.delete || code === EVENT_CODE.backspace) {
    clearTimer() // press delete/backspace clear timer
  }
  else if (code === EVENT_CODE.esc) {
    // press esc to close the notification
    if (visible.value)
      close()
  }
  else {
    startTimer() // resume timer
  }
}

// lifecycle
onMounted(() => {
  startTimer()
  nextZIndex()
  visible.value = true
})

useEventListener(document, 'keydown', onKeydown)

defineExpose({
  visible,
  /** @description close notification */
  close,
})
</script>

<style lang="css" src="../../../styles/components/el-notification.css"></style>

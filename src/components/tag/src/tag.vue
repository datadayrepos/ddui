<template>
  <span
    v-if="disableTransitions"
    :class="containerKls"
    :style="{ backgroundColor: color }"
    @click="handleClick"
  >
    <span :class="ns.e('content')">
      <slot />
    </span>
    <ElIcon v-if="closable" :class="ns.e('close')" @click.stop="handleClose">
      <Close />
    </ElIcon>
  </span>
  <transition v-else :name="`${ns.namespace.value}-zoom-in-center`" appear>
    <span
      :class="containerKls"
      :style="{ backgroundColor: color }"
      @click="handleClick"
    >
      <span :class="ns.e('content')">
        <slot />
      </span>
      <ElIcon v-if="closable" :class="ns.e('close')" @click.stop="handleClose">
        <Close />
      </ElIcon>
    </span>
  </transition>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import ElIcon from '/@/components/icon'
import { Close } from '@element-plus/icons-vue'
import { useNamespace } from '/@/hooks'
import { useFormSize } from '/@/components/form'

import { tagEmits, tagProps } from './tag'

const props = defineProps(tagProps)
const emit = defineEmits(tagEmits)
defineOptions({
  name: 'ElTag',
})
const tagSize = useFormSize()
const ns = useNamespace('tag')
const containerKls = computed(() => {
  const { type, hit, effect, closable, round } = props
  return [
    ns.b(),
    ns.is('closable', closable),
    ns.m(type),
    ns.m(tagSize.value),
    ns.m(effect),
    ns.is('hit', hit),
    ns.is('round', round),
  ]
})

// methods
function handleClose(event: MouseEvent) {
  emit('close', event)
}

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<style lang="css" src="../../../styles/components/el-tag.css"></style>

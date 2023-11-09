<script lang="ts" setup>
import { getCurrentInstance, inject, ref } from 'vue'
import ElIcon from '/@/components/icon'
import { useNamespace } from '/@/hooks'
import type { Router } from 'vue-router'
import { breadcrumbKey } from './constants'
import { breadcrumbItemProps } from './breadcrumb-item'

defineOptions({
  name: 'ElBreadcrumbItem',
})

const props = defineProps(breadcrumbItemProps)

const instance = getCurrentInstance()!
const breadcrumbContext = inject(breadcrumbKey, undefined)
const ns = useNamespace('breadcrumb')

const router = instance.appContext.config.globalProperties.$router as Router

const link = ref<HTMLSpanElement>()

function onClick() {
  if (!props.to || !router)
    return
  props.replace ? router.replace(props.to) : router.push(props.to)
}
</script>

<template>
  <span :class="ns.e('item')">
    <span
      ref="link"
      :class="[ns.e('inner'), ns.is('link', !!to)]"
      role="link"
      @click="onClick"
    >
      <slot />
    </span>
    <ElIcon v-if="breadcrumbContext?.separatorIcon" :class="ns.e('separator')">
      <component :is="breadcrumbContext.separatorIcon" />
    </ElIcon>
    <span v-else :class="ns.e('separator')" role="presentation">
      {{ breadcrumbContext?.separator }}
    </span>
  </span>
</template>

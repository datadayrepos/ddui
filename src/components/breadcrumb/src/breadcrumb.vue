<template>
  <div
    ref="breadcrumb"
    :class="ns.b()"
    aria-label="Breadcrumb"
    role="navigation"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, provide, ref } from 'vue'
import { useNamespace } from '/@/hooks'
import { breadcrumbKey } from './constants'
import { breadcrumbProps } from './breadcrumb'

const props = defineProps(breadcrumbProps)

defineOptions({
  name: 'ElBreadcrumb',
})

const ns = useNamespace('breadcrumb')
const breadcrumb = ref<HTMLDivElement>()

provide(breadcrumbKey, props)

onMounted(() => {
  const items = breadcrumb.value!.querySelectorAll(`.${ns.e('item')}`)
  if (items.length)
    items[items.length - 1].setAttribute('aria-current', 'page')
})
</script>

<style lang="css" src="../../../styles/components/el-breadcrumb.css"></style>

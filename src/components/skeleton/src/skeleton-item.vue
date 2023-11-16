<template>
  <div :class="[ns.e('item'), ns.e(variant)]">
    <PictureFilled v-if="variant === 'image'" />
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '/@/hooks'
import { PictureFilled } from '@element-plus/icons-vue'
import { skeletonItemProps } from './skeleton-item'

defineProps(skeletonItemProps)
defineOptions({
  name: 'ElSkeletonItem',
})
const ns = useNamespace('skeleton')
</script>

<style lang="css" src="../../../styles/components/el-skeleton-item.css"></style>

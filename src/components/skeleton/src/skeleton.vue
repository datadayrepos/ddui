<template>
  <template v-if="uiLoading">
    <div :class="[ns.b(), ns.is('animated', animated)]" v-bind="$attrs">
      <template v-for="i in count" :key="i">
        <slot v-if="loading" :key="i" name="template">
          <ElSkeletonItem :class="ns.is('first')" variant="p" />
          <ElSkeletonItem
            v-for="item in rows"
            :key="item"
            :class="[
              ns.e('paragraph'),
              ns.is('last', item === rows && rows > 1),
            ]"
            variant="p"
          />
        </slot>
      </template>
    </div>
  </template>
  <template v-else>
    <slot v-bind="$attrs" />
  </template>
</template>

<script lang="ts" setup>
import { toRef } from 'vue'
import { useNamespace, useThrottleRender } from '/@/hooks'
import { skeletonProps } from './skeleton'
import ElSkeletonItem from './skeleton-item.vue'

const props = defineProps(skeletonProps)
defineOptions({
  name: 'ElSkeleton',
})
const ns = useNamespace('skeleton')
const uiLoading = useThrottleRender(toRef(props, 'loading'), props.throttle)

defineExpose({
  /** @description loading state */
  uiLoading,
})
</script>

<style lang="css" src="../../../styles/components/el-skeleton.css"></style>

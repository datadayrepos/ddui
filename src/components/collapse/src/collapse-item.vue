<template>
  <div :class="rootKls">
    <button
      :id="scopedHeadId"
      :class="headKls"
      :aria-expanded="isActive"
      :aria-controls="scopedContentId"
      :aria-describedby="scopedContentId"
      :tabindex="disabled ? -1 : 0"
      type="button"
      @click="handleHeaderClick"
      @keydown.space.enter.stop.prevent="handleEnterClick"
      @focus="handleFocus"
      @blur="focusing = false"
    >
      <slot name="title">
        {{ title }}
      </slot>
      <ElIcon :class="arrowKls">
        <ArrowRight />
      </ElIcon>
    </button>

    <ElCollapseTransition>
      <div
        v-show="isActive"
        :id="scopedContentId"
        role="region"
        :class="itemWrapperKls"
        :aria-hidden="!isActive"
        :aria-labelledby="scopedHeadId"
      >
        <div :class="itemContentKls">
          <slot />
        </div>
      </div>
    </ElCollapseTransition>
  </div>
</template>

<script lang="ts" setup>
import ElCollapseTransition from '/@/components/collapse-transition'
import ElIcon from '/@/components/icon'
import { ArrowRight } from '@element-plus/icons-vue'
import { collapseItemProps } from './collapse-item'
import { useCollapseItem, useCollapseItemDOM } from './use-collapse-item'

const props = defineProps(collapseItemProps)

defineOptions({
  name: 'ElCollapseItem',
})

const {
  focusing,
  id,
  isActive,
  handleFocus,
  handleHeaderClick,
  handleEnterClick,
} = useCollapseItem(props)

const {
  arrowKls,
  headKls,
  rootKls,
  itemWrapperKls,
  itemContentKls,
  scopedContentId,
  scopedHeadId,
} = useCollapseItemDOM(props, { focusing, isActive, id })

defineExpose({
  /** @description current collapse-item whether active */
  isActive,
})
</script>

<template>
  <div
    v-show="ready"
    ref="carouselItemRef"
    :class="[
      ns.e('item'),
      ns.is('active', active),
      ns.is('in-stage', inStage),
      ns.is('hover', hover),
      ns.is('animating', animating),
      {
        [ns.em('item', 'card')]: isCardType,
        [ns.em('item', 'card-vertical')]: isCardType && isVertical,
      },
    ]"
    :style="itemStyle"
    @click="handleItemClick"
  >
    <div v-if="isCardType" v-show="!active" :class="ns.e('mask')" />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, unref } from 'vue'
import { useNamespace } from '/@/hooks'
import type { CSSProperties } from 'vue'
import { carouselItemProps } from './carousel-item'
import { useCarouselItem } from './use-carousel-item'

const props = defineProps(carouselItemProps)

defineOptions({
  name: 'ElCarouselItem',
})

const ns = useNamespace('carousel')
const COMPONENT_NAME = 'ElCarouselItem'
// inject
const {
  carouselItemRef,
  active,
  animating,
  hover,
  inStage,
  isVertical,
  translate,
  isCardType,
  scale,
  ready,
  handleItemClick,
} = useCarouselItem(props, COMPONENT_NAME)

const itemStyle = computed<CSSProperties>(() => {
  const translateType = `translate${unref(isVertical) ? 'Y' : 'X'}`
  const _translate = `${translateType}(${unref(translate)}px)`
  const _scale = `scale(${unref(scale)})`
  const transform = [_translate, _scale].join(' ')

  return {
    transform,
  }
})
</script>

<style lang="css" src="../../../styles/components/el-carousel-item.css"></style>

<template>
  <div :class="[ns.b(), ns.is(`${shadow}-shadow`)]">
    <div v-if="$slots.header || header" :class="ns.e('header')">
      <slot name="header">
        {{ header }}
      </slot>
    </div>
    <div :class="[ns.e('body'), bodyClass]" :style="bodyStyle">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '/@/hooks'
import { cardProps } from './card'

defineProps(cardProps)

defineOptions({
  name: 'ElCard',
})

const ns = useNamespace('card')
</script>

<style lang="css" src="../../../styles/components/el-card.css"></style>

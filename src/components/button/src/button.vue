<template>
  <component
    :is="tag"
    ref="_ref"
    v-bind="_props"
    :class="[
      ns.b(),
      ns.m(_type),
      ns.m(_size),
      ns.is('disabled', _disabled),
      ns.is('loading', loading),
      ns.is('plain', plain),
      ns.is('round', round),
      ns.is('circle', circle),
      ns.is('text', text),
      ns.is('link', link),
      ns.is('has-bg', bg),
    ]"
    :style="buttonStyle"
    @click="handleClick"
  >
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <ElIcon v-else :class="ns.is('loading')">
        <component :is="loadingIcon" />
      </ElIcon>
    </template>
    <ElIcon v-else-if="icon || $slots.icon">
      <component :is="icon" v-if="icon" />
      <slot v-else name="icon" />
    </ElIcon>
    <span
      v-if="$slots.default"
      :class="{ [ns.em('text', 'expand')]: shouldAddSpace }"
    >
      <slot />
    </span>
  </component>
</template>

<script lang="ts" setup>
import { ElIcon } from '/@/components/icon'
import { useNamespace } from '/@/hooks'
import { useButton } from './use-button'
import { buttonEmits, buttonProps } from './button'
import { useButtonCustomStyle } from './button-custom'

const props = defineProps(buttonProps)

const emit = defineEmits(buttonEmits)

defineOptions({
  name: 'ElButton',
})

const buttonStyle = useButtonCustomStyle(props)
const ns = useNamespace('button')
const { _ref, _size, _type, _disabled, _props, shouldAddSpace, handleClick }
  = useButton(props, emit)

defineExpose({
  /** @description button html element */
  ref: _ref,
  /** @description button size */
  size: _size,
  /** @description button type */
  type: _type,
  /** @description button disabled */
  disabled: _disabled,
  /** @description whether adding space */
  shouldAddSpace,
})
</script>

<style lang="css" src="../../../styles/components/el-button.css"></style>

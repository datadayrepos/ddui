<template>
  <label
    :class="[
      ns.b('button'),
      ns.is('active', modelValue === label),
      ns.is('disabled', disabled),
      ns.is('focus', focus),
      ns.bm('button', size),
    ]"
  >
    <input
      ref="radioRef"
      v-model="modelValue"
      :class="ns.be('button', 'original-radio')"
      :value="label"
      type="radio"
      :name="name || radioGroup?.name"
      :disabled="disabled"
      @focus="focus = true"
      @blur="focus = false"
      @click.stop
    >
    <span
      :class="ns.be('button', 'inner')"
      :style="modelValue === label ? activeStyle : {}"
      @keydown.stop
    >
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '/@/hooks'
import type { CSSProperties } from 'vue'
import { useRadio } from './use-radio'
import { radioButtonProps } from './radio-button'

const props = defineProps(radioButtonProps)

defineOptions({
  name: 'ElRadioButton',
})

const ns = useNamespace('radio')
const { radioRef, focus, size, disabled, modelValue, radioGroup }
  = useRadio(props)

const activeStyle = computed<CSSProperties>(() => {
  return {
    backgroundColor: radioGroup?.fill || '',
    borderColor: radioGroup?.fill || '',
    boxShadow: radioGroup?.fill ? `-1px 0 0 0 ${radioGroup.fill}` : '',
    color: radioGroup?.textColor || '',
  }
})
</script>

<style lang="css" src="../../../styles/components/el-radio-button.css"></style>

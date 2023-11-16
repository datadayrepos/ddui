<template>
  <div :class="switchKls" :style="styles" @click.prevent="switchValue">
    <input
      :id="inputId"
      ref="input"
      :class="ns.e('input')"
      type="checkbox"
      role="switch"
      :aria-checked="checked"
      :aria-disabled="switchDisabled"
      :aria-label="label"
      :name="name"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="switchDisabled"
      :tabindex="tabindex"
      @change="handleChange"
      @keydown.enter="switchValue"
    >
    <span
      v-if="!inlinePrompt && (inactiveIcon || inactiveText)"
      :class="labelLeftKls"
    >
      <ElIcon v-if="inactiveIcon">
        <component :is="inactiveIcon" />
      </ElIcon>
      <span v-if="!inactiveIcon && inactiveText" :aria-hidden="checked">{{
        inactiveText
      }}</span>
    </span>
    <span ref="core" :class="ns.e('core')" :style="coreStyle">
      <div v-if="inlinePrompt" :class="ns.e('inner')">
        <template v-if="activeIcon || inactiveIcon">
          <ElIcon :class="ns.is('icon')">
            <component :is="checked ? activeIcon : inactiveIcon" />
          </ElIcon>
        </template>
        <template v-else-if="activeText || inactiveText">
          <span :class="ns.is('text')" :aria-hidden="!checked">
            {{ checked ? activeText : inactiveText }}
          </span>
        </template>
      </div>
      <div :class="ns.e('action')">
        <ElIcon v-if="loading" :class="ns.is('loading')">
          <Loading />
        </ElIcon>
        <ElIcon v-else-if="activeActionIcon && checked">
          <component :is="activeActionIcon" />
        </ElIcon>
        <ElIcon v-else-if="inactiveActionIcon && !checked">
          <component :is="inactiveActionIcon" />
        </ElIcon>
      </div>
    </span>
    <span
      v-if="!inlinePrompt && (activeIcon || activeText)"
      :class="labelRightKls"
    >
      <ElIcon v-if="activeIcon">
        <component :is="activeIcon" />
      </ElIcon>
      <span v-if="!activeIcon && activeText" :aria-hidden="!checked">{{
        activeText
      }}</span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue'

// eslint-disable-next-line vue/prefer-import-from-vue
import { isPromise } from '@vue/shared'
import { addUnit, debugWarn, isBoolean, throwError } from '/@/utils'
import ElIcon from '/@/components/icon'
import {
  useFormDisabled,
  useFormItem,
  useFormItemInputId,
  useFormSize,
} from '/@/components/form'
import { Loading } from '@element-plus/icons-vue'
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '/@/constants'
import { useDeprecated, useNamespace } from '/@/hooks'
import type { CSSProperties } from 'vue'
import { switchEmits, switchProps } from './switch'

const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)
const COMPONENT_NAME = 'ElSwitch'
defineOptions({
  name: COMPONENT_NAME,
})

const vm = getCurrentInstance()!
const { formItem } = useFormItem()
const switchSize = useFormSize()
const ns = useNamespace('switch')

function useBatchDeprecated(list: string[][]) {
  list.forEach((param) => {
    useDeprecated(
      {
        from: param[0],
        replacement: param[1],
        scope: COMPONENT_NAME,
        version: '2.3.0',
        ref: 'https://element-plus.org/en-US/component/switch.html#attributes',
        type: 'Attribute',
      },
      computed(() => !!vm.vnode.props?.[param[2]]),
    )
  })
}
useBatchDeprecated([
  ['"value"', '"model-value" or "v-model"', 'value'],
  ['"active-color"', 'CSS var `--el-switch-on-color`', 'activeColor'],
  ['"inactive-color"', 'CSS var `--el-switch-off-color`', 'inactiveColor'],
  ['"border-color"', 'CSS var `--el-switch-border-color`', 'borderColor'],
])

const { inputId } = useFormItemInputId(props, {
  formItemContext: formItem,
})

const switchDisabled = useFormDisabled(computed(() => props.loading))
const isControlled = ref(props.modelValue !== false)
const input = ref<HTMLInputElement>()
const core = ref<HTMLSpanElement>()

const actualValue = computed(() => {
  return isControlled.value ? props.modelValue : props.value
})

const checked = computed(() => actualValue.value === props.activeValue)

const switchKls = computed(() => [
  ns.b(),
  ns.m(switchSize.value),
  ns.is('disabled', switchDisabled.value),
  ns.is('checked', checked.value),
])

const labelLeftKls = computed(() => [
  ns.e('label'),
  ns.em('label', 'left'),
  ns.is('active', !checked.value),
])

const labelRightKls = computed(() => [
  ns.e('label'),
  ns.em('label', 'right'),
  ns.is('active', checked.value),
])

const coreStyle = computed<CSSProperties>(() => ({
  width: addUnit(props.width),
}))

watch(
  () => props.modelValue,
  () => {
    isControlled.value = true
  },
)

watch(
  () => props.value,
  () => {
    isControlled.value = false
  },
)

if (![props.activeValue, props.inactiveValue].includes(actualValue.value)) {
  emit(UPDATE_MODEL_EVENT, props.inactiveValue)
  emit(CHANGE_EVENT, props.inactiveValue)
  emit(INPUT_EVENT, props.inactiveValue)
}

watch(checked, (val) => {
  input.value!.checked = val

  if (props.validateEvent)
    formItem?.validate?.('change').catch(err => debugWarn(err))
})

function handleChange() {
  const val = checked.value ? props.inactiveValue : props.activeValue
  emit(UPDATE_MODEL_EVENT, val)
  emit(CHANGE_EVENT, val)
  emit(INPUT_EVENT, val)
  nextTick(() => {
    input.value!.checked = checked.value
  })
}

function switchValue() {
  if (switchDisabled.value)
    return

  const { beforeChange } = props
  if (!beforeChange) {
    handleChange()
    return
  }

  const shouldChange = beforeChange()

  const isPromiseOrBool = [
    isPromise(shouldChange),
    isBoolean(shouldChange),
  ].includes(true)
  if (!isPromiseOrBool) {
    throwError(
      COMPONENT_NAME,
      'beforeChange must return type `Promise<boolean>` or `boolean`',
    )
  }

  if (isPromise(shouldChange)) {
    shouldChange
      .then((result) => {
        if (result)
          handleChange()
      })
      .catch((e) => {
        debugWarn(COMPONENT_NAME, `some error occurred: ${e}`)
      })
  }
  else if (shouldChange) {
    handleChange()
  }
}

const styles = computed(() => {
  return ns.cssVarBlock({
    ...(props.activeColor ? { 'on-color': props.activeColor } : null),
    ...(props.inactiveColor ? { 'off-color': props.inactiveColor } : null),
    ...(props.borderColor ? { 'border-color': props.borderColor } : null),
  })
})

function focus(): void {
  input.value?.focus?.()
}

onMounted(() => {
  input.value!.checked = checked.value
})

defineExpose({
  /**
   *  @description manual focus to the switch component
   */
  focus,
  /**
   * @description whether Switch is checked
   */
  checked,
})
</script>

<style lang="css" src="../../../styles/components/el-switch.css"></style>

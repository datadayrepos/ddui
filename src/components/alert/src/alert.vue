<script lang="ts" setup>
import { computed, ref, useSlots } from 'vue'
import { ElIcon } from '/@/components/icon'
import { TypeComponents, TypeComponentsMap } from '/@/utils'
import { useNamespace } from '/@/hooks'
import { alertEmits, alertProps } from './alert'

defineOptions({
  name: 'ElAlert',
})

const props = defineProps(alertProps)

const emit = defineEmits(alertEmits)

const { Close } = TypeComponents

const slots = useSlots()

const ns = useNamespace('alert')

const visible = ref(true)

const iconComponent = computed(() => TypeComponentsMap[props.type])

const iconClass = computed(() => [
  ns.e('icon'),
  { [ns.is('big')]: !!props.description || !!slots.default },
])

const isBoldTitle = computed(() => {
  return { [ns.is('bold')]: props.description || slots.default }
})

function close(evt: MouseEvent) {
  visible.value = false
  emit('close', evt)
}
</script>

<template>
  <transition :name="ns.b('fade')">
    <div
      v-show="visible"
      :class="[ns.b(), ns.m(type), ns.is('center', center), ns.is(effect)]"
      role="alert"
    >
      <ElIcon v-if="showIcon && iconComponent" :class="iconClass">
        <component :is="iconComponent" />
      </ElIcon>

      <div :class="ns.e('content')">
        <span
          v-if="title || $slots.title"
          :class="[ns.e('title'), isBoldTitle]"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p v-if="$slots.default || description" :class="ns.e('description')">
          <slot>
            {{ description }}
          </slot>
        </p>
        <template v-if="closable">
          <div
            v-if="closeText"
            :class="[ns.e('close-btn'), ns.is('customed')]"
            @click="close"
          >
            {{ closeText }}
          </div>
          <ElIcon v-else :class="ns.e('close-btn')" @click="close">
            <Close />
          </ElIcon>
        </template>
      </div>
    </div>
  </transition>
</template>

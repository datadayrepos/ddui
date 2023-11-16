<template>
  <div :ref="composedDialogRef" :class="dialogKls" :style="style" tabindex="-1">
    <header ref="headerRef" :class="ns.e('header')">
      <slot name="header">
        <span role="heading" :aria-level="ariaLevel" :class="ns.e('title')">
          {{ title }}
        </span>
      </slot>
      <button
        v-if="showClose"
        :aria-label="t('el.dialog.close')"
        :class="ns.e('headerbtn')"
        type="button"
        @click="$emit('close')"
      >
        <ElIcon :class="ns.e('close')">
          <component :is="closeIcon || Close" />
        </ElIcon>
      </button>
    </header>
    <div :id="bodyId" :class="ns.e('body')">
      <slot />
    </div>
    <footer v-if="$slots.footer" :class="ns.e('footer')">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { ElIcon } from '/@/components/icon'
import { FOCUS_TRAP_INJECTION_KEY } from '/@/components/focus-trap'
import { useDraggable, useLocale } from '/@/hooks'
import { CloseComponents, composeRefs } from '/@/utils'
import { dialogInjectionKey } from './constants'
import { dialogContentEmits, dialogContentProps } from './dialog-content'

const props = defineProps(dialogContentProps)
defineEmits(dialogContentEmits)
defineOptions({ name: 'ElDialogContent' })
const { t } = useLocale()
const { Close } = CloseComponents

const { dialogRef, headerRef, bodyId, ns, style } = inject(dialogInjectionKey)!
const { focusTrapRef } = inject(FOCUS_TRAP_INJECTION_KEY)!

const dialogKls = computed(() => [
  ns.b(),
  ns.is('fullscreen', props.fullscreen),
  ns.is('draggable', props.draggable),
  ns.is('align-center', props.alignCenter),
  { [ns.m('center')]: props.center },
  props.customClass,
])

const composedDialogRef = composeRefs(focusTrapRef, dialogRef)

const draggable = computed(() => props.draggable)
useDraggable(dialogRef, headerRef, draggable)
</script>

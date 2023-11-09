<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { ElIcon } from '/@/components/icon'
import { ElDivider } from '/@/components/divider'

import { useLocale, useNamespace } from '/@/hooks'
import { pageHeaderEmits, pageHeaderProps } from './page-header'

defineOptions({
  name: 'ElPageHeader',
})

defineProps(pageHeaderProps)
const emit = defineEmits(pageHeaderEmits)
const slots = useSlots()

const { t } = useLocale()
const ns = useNamespace('page-header')
const kls = computed(() => {
  return [
    ns.b(),
    {
      [ns.m('has-breadcrumb')]: !!slots.breadcrumb,
      [ns.m('has-extra')]: !!slots.extra,
      [ns.is('contentful')]: !!slots.default,
    },
  ]
})

function handleClick() {
  emit('back')
}
</script>

<template>
  <div :class="kls">
    <div v-if="$slots.breadcrumb" :class="ns.e('breadcrumb')">
      <slot name="breadcrumb" />
    </div>
    <div :class="ns.e('header')">
      <div :class="ns.e('left')">
        <div
          :class="ns.e('back')"
          role="button"
          tabindex="0"
          @click="handleClick"
        >
          <div
            v-if="icon || $slots.icon"
            :aria-label="title || t('el.pageHeader.title')"
            :class="ns.e('icon')"
          >
            <slot name="icon">
              <ElIcon v-if="icon">
                <component :is="icon" />
              </ElIcon>
            </slot>
          </div>
          <div :class="ns.e('title')">
            <slot name="title">
              {{ title || t('el.pageHeader.title') }}
            </slot>
          </div>
        </div>
        <ElDivider direction="vertical" />
        <div :class="ns.e('content')">
          <slot name="content">
            {{ content }}
          </slot>
        </div>
      </div>

      <div v-if="$slots.extra" :class="ns.e('extra')">
        <slot name="extra" />
      </div>
    </div>

    <div v-if="$slots.default" :class="ns.e('main')">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { reactive, toRefs } from 'vue'
import { pick } from '@datadayrepos/lodashts'
import { tooltipV2ArrowProps } from './arrow'
import { tooltipV2ContentProps } from './content'
import { tooltipV2RootProps } from './root'
import { tooltipV2Props } from './tooltip'
import { tooltipV2TriggerProps } from './trigger'
import TooltipV2Root from './root.vue'
import TooltipV2Arrow from './arrow.vue'
import TooltipV2Content from './content.vue'
import TooltipV2Trigger from './trigger.vue'

defineOptions({
  name: 'ElTooltipV2',
})

const props = defineProps(tooltipV2Props)

const refedProps = toRefs(props)

const arrowProps = reactive(pick(refedProps, Object.keys(tooltipV2ArrowProps)))

const contentProps = reactive(
  pick(refedProps, Object.keys(tooltipV2ContentProps)),
)

const rootProps = reactive(pick(refedProps, Object.keys(tooltipV2RootProps)))

const triggerProps = reactive(
  pick(refedProps, Object.keys(tooltipV2TriggerProps)),
)
</script>

<template>
  <TooltipV2Root v-bind="rootProps">
    <template #default="{ open }">
      <TooltipV2Trigger v-bind="triggerProps" nowrap>
        <slot name="trigger" />
      </TooltipV2Trigger>
      <teleport :to="to" :disabled="!teleported">
        <template v-if="fullTransition">
          <transition v-bind="transitionProps">
            <TooltipV2Content v-if="alwaysOn || open" v-bind="contentProps">
              <slot />
              <template #arrow="{ style, side }">
                <TooltipV2Arrow
                  v-if="showArrow"
                  v-bind="arrowProps"
                  :style="style"
                  :side="side"
                />
              </template>
            </TooltipV2Content>
          </transition>
        </template>
        <template v-else>
          <TooltipV2Content v-if="alwaysOn || open" v-bind="contentProps">
            <slot />
            <template #arrow="{ style, side }">
              <TooltipV2Arrow
                v-if="showArrow"
                v-bind="arrowProps"
                :style="style"
                :side="side"
              />
            </template>
          </TooltipV2Content>
        </template>
      </teleport>
    </template>
  </TooltipV2Root>
</template>

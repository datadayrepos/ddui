<script lang="ts" setup>
import { computed } from 'vue'
import { ElButton, ElButtonGroup } from '/@/components/button'
import { useLocale, useNamespace } from '/@/hooks'

import DateTable from './date-table.vue'
import { useCalendar } from './use-calendar'
import { calendarEmits, calendarProps } from './calendar'

defineOptions({
  name: COMPONENT_NAME,
})

const props = defineProps(calendarProps)

const emit = defineEmits(calendarEmits)

const ns = useNamespace('calendar')

const COMPONENT_NAME = 'ElCalendar'
const {
  calculateValidatedDateRange,
  date,
  pickDay,
  realSelectedDay,
  selectDate,
  validatedRange,
} = useCalendar(props, emit, COMPONENT_NAME)

const { t } = useLocale()

const i18nDate = computed(() => {
  const pickedMonth = `el.datepicker.month${date.value.format('M')}`
  return `${date.value.year()} ${t('el.datepicker.year')} ${t(pickedMonth)}`
})

defineExpose({
  /** @description currently selected date */
  selectedDay: realSelectedDay,
  /** @description select a specific date */
  pickDay,
  /** @description select date */
  selectDate,
  /** @description Calculate the validate date range according to the start and end dates */
  calculateValidatedDateRange,
})
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.e('header')">
      <slot name="header" :date="i18nDate">
        <div :class="ns.e('title')">
          {{ i18nDate }}
        </div>
        <div v-if="validatedRange.length === 0" :class="ns.e('button-group')">
          <ElButtonGroup>
            <ElButton size="small" @click="selectDate('prev-month')">
              {{ t('el.datepicker.prevMonth') }}
            </ElButton>
            <ElButton size="small" @click="selectDate('today')">
              {{ t('el.datepicker.today') }}
            </ElButton>
            <ElButton size="small" @click="selectDate('next-month')">
              {{ t('el.datepicker.nextMonth') }}
            </ElButton>
          </ElButtonGroup>
        </div>
      </slot>
    </div>
    <div v-if="validatedRange.length === 0" :class="ns.e('body')">
      <DateTable :date="date" :selected-day="realSelectedDay" @pick="pickDay">
        <template
          v-if="$slots['date-cell'] || $slots.dateCell"
          #date-cell="data"
        >
          <slot v-if="$slots['date-cell']" name="date-cell" v-bind="data" />
          <slot v-else name="dateCell" v-bind="data" />
        </template>
      </DateTable>
    </div>
    <div v-else :class="ns.e('body')">
      <DateTable
        v-for="(range_, index) in validatedRange"
        :key="index"
        :date="range_[0]"
        :selected-day="realSelectedDay"
        :range="range_"
        :hide-header="index !== 0"
        @pick="pickDay"
      >
        <template
          v-if="$slots['date-cell'] || $slots.dateCell"
          #date-cell="data"
        >
          <slot v-if="$slots['date-cell']" name="date-cell" v-bind="data" />
          <slot v-else name="dateCell" v-bind="data" />
        </template>
      </DateTable>
    </div>
  </div>
</template>

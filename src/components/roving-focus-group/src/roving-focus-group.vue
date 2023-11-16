<template>
  <ElFocusGroupCollection>
    <ElRovingFocusGroupImpl v-bind="$attrs">
      <slot />
    </ElRovingFocusGroupImpl>
  </ElFocusGroupCollection>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ElRovingFocusGroupImpl from './roving-focus-group-impl.vue'
import { ElCollection as ElFocusGroupCollection } from './roving-focus-group'

export default defineComponent({
  name: 'ElRovingFocusGroup',
  components: {
    ElFocusGroupCollection,
    ElRovingFocusGroupImpl,
  },
})
</script>

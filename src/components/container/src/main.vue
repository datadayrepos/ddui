<script lang="ts" setup>
import { useNamespace } from '/@/hooks'

defineOptions({
  name: 'ElMain',
})

const ns = useNamespace('main')
</script>

<template>
  <main :class="ns.b()">
    <slot />
  </main>
</template>

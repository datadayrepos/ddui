<template>
  <main :class="ns.b()">
    <slot />
  </main>
</template>

<script lang="ts" setup>
import { useNamespace } from '/@/hooks'

defineOptions({
  name: 'ElMain',
})

const ns = useNamespace('main')
</script>

<style lang="css" src="../../../styles/components/el-main.css"></style>

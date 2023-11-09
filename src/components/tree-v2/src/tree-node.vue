<template>
  <div
    ref="node$"
    :class="[
      ns.b('node'),
      ns.is('expanded', expanded),
      ns.is('current', current),
      ns.is('focusable', !disabled),
      ns.is('checked', !disabled && checked),
    ]"
    role="treeitem"
    tabindex="-1"
    :aria-expanded="expanded"
    :aria-disabled="disabled"
    :aria-checked="checked"
    :data-key="node?.key"
    @click.stop="handleClick"
    @contextmenu="handleContextMenu"
  >
    <div
      :class="ns.be('node', 'content')"
      :style="{
        paddingLeft: `${(node.level - 1) * indent}px`,
        height: `${itemSize}px`,
      }"
    >
      <ElIcon
        v-if="icon"
        :class="[
          ns.is('leaf', !!node?.isLeaf),
          ns.is('hidden', hiddenExpandIcon),
          {
            expanded: !node?.isLeaf && expanded,
          },
          ns.be('node', 'expand-icon'),
        ]"
        @click.stop="handleExpandIconClick"
      >
        <component :is="icon" />
      </ElIcon>
      <ElCheckbox
        v-if="showCheckbox"
        :model-value="checked"
        :indeterminate="indeterminate"
        :disabled="disabled"
        @change="handleCheckChange"
        @click.stop
      />
      <ElNodeContent :node="node" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import ElIcon from '/@/components/icon'
import { CaretRight } from '@element-plus/icons-vue'
import ElCheckbox from '/@/components/checkbox'
import { useNamespace } from '/@/hooks'
import ElNodeContent from './tree-node-content'
import {
  NODE_CONTEXTMENU,
  ROOT_TREE_INJECTION_KEY,
  treeNodeEmits,
  treeNodeProps,
} from './virtual-tree'
import type { CheckboxValueType } from '/@/components/checkbox'

const props = defineProps(treeNodeProps)

const emit = defineEmits(treeNodeEmits)

defineOptions({
  name: 'ElTreeNode',
})

const tree = inject(ROOT_TREE_INJECTION_KEY)
const ns = useNamespace('tree')

const indent = computed(() => {
  return tree?.props.indent ?? 16
})

const icon = computed(() => {
  return tree?.props.icon ?? CaretRight
})

function handleClick(e: MouseEvent) {
  emit('click', props.node, e)
}
function handleExpandIconClick() {
  emit('toggle', props.node)
}
function handleCheckChange(value: CheckboxValueType) {
  emit('check', props.node, value)
}
function handleContextMenu(event: Event) {
  if (tree?.instance?.vnode?.props?.onNodeContextmenu) {
    event.stopPropagation()
    event.preventDefault()
  }
  tree?.ctx.emit(NODE_CONTEXTMENU, event, props.node?.data, props.node)
}
</script>

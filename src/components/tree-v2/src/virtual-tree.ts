import {
  buildProps,
  definePropType,
  iconPropType,
  mutable,
} from '/@/utils'
import type { CheckboxValueType } from '/@/components/checkbox'
import type { InjectionKey } from 'vue'
import type { TreeNodeData } from '/@/components/tree/src/tree.type'
import type {
  CheckedInfo,
  FilterMethod,
  TreeContext,
  TreeData,
  TreeKey,
  TreeNode,
  TreeOptionProps,
} from './types'

// constants
export const ROOT_TREE_INJECTION_KEY: InjectionKey<TreeContext> = Symbol()
const EMPTY_NODE = {
  data: {},
  key: -1,
  level: -1,
} as const

// enums
export enum TreeOptionsEnum {
  KEY = 'id',
  LABEL = 'label',
  CHILDREN = 'children',
  DISABLED = 'disabled',
}

export const enum SetOperationEnum {
  ADD = 'add',
  DELETE = 'delete',
}

const itemSize = {
  default: 26,
  type: Number,
}

// props
export const treeProps = buildProps({
  // TODO need to optimization
  accordion: {
    default: false,
    type: Boolean,
  },
  checkOnClickNode: {
    default: false,
    type: Boolean,
  },
  // Whether checked state of a node not affects its father and
  // child nodes when show-checkbox is true
  checkStrictly: {
    default: false,
    type: Boolean,
  },
  currentNodeKey: {
    type: definePropType<TreeKey>([String, Number]),
  },
  data: {
    default: () => mutable([] as const),
    type: definePropType<TreeData>(Array),
  },
  defaultCheckedKeys: {
    default: () => mutable([] as const),
    type: definePropType<TreeKey[]>(Array),
  },
  defaultExpandedKeys: {
    default: () => mutable([] as const),
    type: definePropType<TreeKey[]>(Array),
  },
  emptyText: {
    type: String,
  },
  expandOnClickNode: {
    default: true,
    type: Boolean,
  },
  filterMethod: {
    type: definePropType<FilterMethod>(Function),
  },
  height: {
    default: 200,
    type: Number,
  },
  highlightCurrent: {
    default: false,
    type: Boolean,
  },
  icon: {
    type: iconPropType,
  },
  indent: {
    default: 16,
    type: Number,
  },
  itemSize,
  // Performance mode will increase memory usage, but scrolling will be smoother
  perfMode: {
    default: true,
    type: Boolean,
  },
  props: {
    default: () =>
      mutable({
        children: TreeOptionsEnum.CHILDREN,
        disabled: TreeOptionsEnum.DISABLED,
        label: TreeOptionsEnum.LABEL,
        value: TreeOptionsEnum.KEY,
      } as const),
    type: definePropType<TreeOptionProps>(Object),
  },
  showCheckbox: {
    default: false,
    type: Boolean,
  },
} as const)

export const treeNodeProps = buildProps({
  checked: {
    default: false,
    type: Boolean,
  },
  current: {
    default: false,
    type: Boolean,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  expanded: {
    default: false,
    type: Boolean,
  },
  hiddenExpandIcon: {
    default: false,
    type: Boolean,
  },
  indeterminate: {
    default: false,
    type: Boolean,
  },
  itemSize,
  node: {
    default: () => mutable(EMPTY_NODE),
    type: definePropType<TreeNode>(Object),
  },
  showCheckbox: {
    default: false,
    type: Boolean,
  },
} as const)

export const treeNodeContentProps = buildProps({
  node: {
    required: true,
    type: definePropType<TreeNode>(Object),
  },
} as const)

// emits
export const NODE_CLICK = 'node-click'
export const NODE_EXPAND = 'node-expand'
export const NODE_COLLAPSE = 'node-collapse'
export const CURRENT_CHANGE = 'current-change'
export const NODE_CHECK = 'check'
export const NODE_CHECK_CHANGE = 'check-change'
export const NODE_CONTEXTMENU = 'node-contextmenu'

export const treeEmits = {
  [CURRENT_CHANGE]: (data: TreeNodeData, node: TreeNode) => data && node,
  [NODE_CHECK]: (data: TreeNodeData, checkedInfo: CheckedInfo) => data && checkedInfo,
  [NODE_CHECK_CHANGE]: (data: TreeNodeData, checked: boolean) => data && typeof checked === 'boolean',
  [NODE_CLICK]: (data: TreeNodeData, node: TreeNode, e: MouseEvent) => data && node && e,
  [NODE_COLLAPSE]: (data: TreeNodeData, node: TreeNode) => data && node,
  [NODE_CONTEXTMENU]: (event: Event, data: TreeNodeData, node: TreeNode) => event && data && node,
  [NODE_EXPAND]: (data: TreeNodeData, node: TreeNode) => data && node,
}

export const treeNodeEmits = {
  check: (node: TreeNode, checked: CheckboxValueType) => node && typeof checked === 'boolean',
  click: (node: TreeNode, e: MouseEvent) => !!(node && e),
  toggle: (node: TreeNode) => !!node,
}

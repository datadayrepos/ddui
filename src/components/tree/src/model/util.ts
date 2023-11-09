import type { SetupContext } from 'vue'
import type { RootTreeType, TreeKey, TreeNodeData } from '../tree.type'
import type Node from './node'

export const NODE_KEY = '$treeNodeId'

export const markNodeData = function (node: Node, data: TreeNodeData): void {
  if (!data || data[NODE_KEY])
    return
  Object.defineProperty(data, NODE_KEY, {
    configurable: false,
    enumerable: false,
    value: node.id,
    writable: false,
  })
}

export const getNodeKey = function (key: TreeKey, data: TreeNodeData): any {
  if (!key)
    return data[NODE_KEY]
  return data[key]
}

export function handleCurrentChange(store: RootTreeType['store'], emit: SetupContext['emit'], setCurrent: () => void) {
  const preCurrentNode = store.value.currentNode
  setCurrent()
  const currentNode = store.value.currentNode
  if (preCurrentNode === currentNode)
    return

  emit('current-change', currentNode ? currentNode.data : null, currentNode)
}

// @ts-nocheck
import { defineComponent, h } from 'vue'
import { useNamespace } from '/@/hooks'

export default defineComponent({
  name: 'NodeContent',
  render() {
    const { ns } = this
    const { node, panel } = this.$parent
    const { data, label } = node
    const { renderLabelFn } = panel
    return h(
      'span',
      { class: ns.e('label') },
      renderLabelFn ? renderLabelFn({ data, node }) : label,
    )
  },
  setup() {
    const ns = useNamespace('cascader-node')
    return {
      ns,
    }
  },
})

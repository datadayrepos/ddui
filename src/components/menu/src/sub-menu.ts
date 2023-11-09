import {
  Fragment,
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
  vShow,
  watch,
  withDirectives,
} from 'vue'
import { useTimeoutFn } from '@datadayrepos/usevueshared'
import ElCollapseTransition from '/@/components/collapse-transition'
import ElTooltip from '/@/components/tooltip'
import {
  buildProps,
  iconPropType,
  isString,
  throwError,
} from '/@/utils'
import { useDeprecated, useNamespace } from '/@/hooks'
import { ArrowDown, ArrowRight } from '@element-plus/icons-vue'
import { ElIcon } from '/@/components/icon'
import type { ExtractPropTypes, VNodeArrayChildren } from 'vue'
import useMenu from './use-menu'
import { useMenuCssVar } from './use-menu-css-var'

import type { Placement } from '/@/components/popper'
import type { MenuProvider, SubMenuProvider } from './types'

export const subMenuProps = buildProps({
  collapseCloseIcon: {
    type: iconPropType,
  },
  collapseOpenIcon: {
    type: iconPropType,
  },
  disabled: Boolean,
  expandCloseIcon: {
    type: iconPropType,
  },
  expandOpenIcon: {
    type: iconPropType,
  },
  hideTimeout: {
    default: 300,
    type: Number,
  },
  index: {
    required: true,
    type: String,
  },
  popperAppendToBody: {
    default: undefined,
    type: Boolean,
  },
  popperClass: String,
  popperOffset: {
    default: 6,
    type: Number,
  },
  showTimeout: {
    default: 300,
    type: Number,
  },
  teleported: {
    default: undefined,
    type: Boolean,
  },
} as const)
export type SubMenuProps = ExtractPropTypes<typeof subMenuProps>

const COMPONENT_NAME = 'ElSubMenu'
export default defineComponent({
  name: COMPONENT_NAME,
  props: subMenuProps,

  setup(props, { slots, expose }) {
    useDeprecated(
      {
        from: 'popper-append-to-body',
        ref: 'https://element-plus.org/en-US/component/menu.html#submenu-attributes',
        replacement: 'teleported',
        scope: COMPONENT_NAME,
        version: '2.3.0',
      },
      computed(() => props.popperAppendToBody !== undefined),
    )

    const instance = getCurrentInstance()!
    const { indexPath, parentMenu } = useMenu(
      instance,
      computed(() => props.index),
    )
    const nsMenu = useNamespace('menu')
    const nsSubMenu = useNamespace('sub-menu')

    // inject
    const rootMenu = inject<MenuProvider>('rootMenu')
    if (!rootMenu)
      throwError(COMPONENT_NAME, 'can not inject root menu')

    const subMenu = inject<SubMenuProvider>(`subMenu:${parentMenu.value!.uid}`)
    if (!subMenu)
      throwError(COMPONENT_NAME, 'can not inject sub menu')

    const items = ref<MenuProvider['items']>({})
    const subMenus = ref<MenuProvider['subMenus']>({})

    let timeout: (() => void) | undefined
    const mouseInChild = ref(false)
    const verticalTitleRef = ref<HTMLDivElement>()
    const vPopper = ref<InstanceType<typeof ElTooltip> | null>(null)

    // computed
    const currentPlacement = computed<Placement>(() =>
      mode.value === 'horizontal' && isFirstLevel.value
        ? 'bottom-start'
        : 'right-start',
    )
    const subMenuTitleIcon = computed(() => {
      return (mode.value === 'horizontal' && isFirstLevel.value)
        || (mode.value === 'vertical' && !rootMenu.props.collapse)
        ? props.expandCloseIcon && props.expandOpenIcon
          ? opened.value
            ? props.expandOpenIcon
            : props.expandCloseIcon
          : ArrowDown
        : props.collapseCloseIcon && props.collapseOpenIcon
          ? opened.value
            ? props.collapseOpenIcon
            : props.collapseCloseIcon
          : ArrowRight
    })
    const isFirstLevel = computed(() => {
      return subMenu.level === 0
    })
    const appendToBody = computed(() => {
      const value = props.teleported ?? props.popperAppendToBody
      return value === undefined ? isFirstLevel.value : value
    })
    const menuTransitionName = computed(() =>
      rootMenu.props.collapse
        ? `${nsMenu.namespace.value}-zoom-in-left`
        : `${nsMenu.namespace.value}-zoom-in-top`,
    )
    const fallbackPlacements = computed<Placement[]>(() =>
      mode.value === 'horizontal' && isFirstLevel.value
        ? [
            'bottom-start',
            'bottom-end',
            'top-start',
            'top-end',
            'right-start',
            'left-start',
          ]
        : [
            'right-start',
            'right',
            'right-end',
            'left-start',
            'bottom-start',
            'bottom-end',
            'top-start',
            'top-end',
          ],
    )
    const opened = computed(() => rootMenu.openedMenus.includes(props.index))
    const active = computed(() => {
      let isActive = false

      Object.values(items.value).forEach((item) => {
        if (item.active)
          isActive = true
      })

      Object.values(subMenus.value).forEach((subItem) => {
        if (subItem.active)
          isActive = true
      })

      return isActive
    })

    const mode = computed(() => rootMenu.props.mode)
    const item = reactive({
      active,
      index: props.index,
      indexPath,
    })

    const ulStyle = useMenuCssVar(rootMenu.props, subMenu.level + 1)

    // methods
    const doDestroy = () =>
      vPopper.value?.popperRef?.popperInstanceRef?.destroy()

    const handleCollapseToggle = (value: boolean) => {
      if (!value)
        doDestroy()
    }

    const handleClick = () => {
      if (
        (rootMenu.props.menuTrigger === 'hover'
          && rootMenu.props.mode === 'horizontal')
        || (rootMenu.props.collapse && rootMenu.props.mode === 'vertical')
        || props.disabled
      )
        return

      rootMenu.handleSubMenuClick({
        active: active.value,
        index: props.index,
        indexPath: indexPath.value,
      })
    }

    const handleMouseenter = (
      event: MouseEvent | FocusEvent,
      showTimeout = props.showTimeout,
    ) => {
      if (event.type === 'focus')
        return

      if (
        (rootMenu.props.menuTrigger === 'click'
          && rootMenu.props.mode === 'horizontal')
        || (!rootMenu.props.collapse && rootMenu.props.mode === 'vertical')
        || props.disabled
      )
        return

      subMenu.mouseInChild.value = true

      timeout?.()
      ;({ stop: timeout } = useTimeoutFn(() => {
        rootMenu.openMenu(props.index, indexPath.value)
      }, showTimeout))

      if (appendToBody.value)
        parentMenu.value.vnode.el?.dispatchEvent(new MouseEvent('mouseenter'))
    }

    const handleMouseleave = (deepDispatch = false) => {
      if (
        (rootMenu.props.menuTrigger === 'click'
          && rootMenu.props.mode === 'horizontal')
        || (!rootMenu.props.collapse && rootMenu.props.mode === 'vertical')
      )
        return

      timeout?.()
      subMenu.mouseInChild.value = false
      ;({ stop: timeout } = useTimeoutFn(
        () =>
          !mouseInChild.value
          && rootMenu.closeMenu(props.index, indexPath.value),
        props.hideTimeout,
      ))

      if (appendToBody.value && deepDispatch) {
        if (instance.parent?.type.name === 'ElSubMenu')
          subMenu.handleMouseleave?.(true)
      }
    }

    watch(
      () => rootMenu.props.collapse,
      value => handleCollapseToggle(Boolean(value)),
    )

    // provide
    {
      const addSubMenu: SubMenuProvider['addSubMenu'] = (item) => {
        subMenus.value[item.index] = item
      }
      const removeSubMenu: SubMenuProvider['removeSubMenu'] = (item) => {
        delete subMenus.value[item.index]
      }
      provide<SubMenuProvider>(`subMenu:${instance.uid}`, {
        addSubMenu,
        handleMouseleave,
        level: subMenu.level + 1,
        mouseInChild,
        removeSubMenu,
      })
    }

    // expose
    expose({
      opened,
    })

    // lifecycle
    onMounted(() => {
      rootMenu.addSubMenu(item)
      subMenu.addSubMenu(item)
    })

    onBeforeUnmount(() => {
      subMenu.removeSubMenu(item)
      rootMenu.removeSubMenu(item)
    })

    return () => {
      const titleTag: VNodeArrayChildren = [
        slots.title?.(),
        h(
          ElIcon,
          {
            class: nsSubMenu.e('icon-arrow'),
            style: {
              transform: opened.value
                ? (props.expandCloseIcon && props.expandOpenIcon)
                  || (props.collapseCloseIcon
                    && props.collapseOpenIcon
                    && rootMenu.props.collapse)
                    ? 'none'
                    : 'rotateZ(180deg)'
                : 'none',
            },
          },
          {
            default: () =>
              isString(subMenuTitleIcon.value)
                ? h(instance.appContext.components[subMenuTitleIcon.value])
                : h(subMenuTitleIcon.value),
          },
        ),
      ]

      // this render function is only used for bypass `Vue`'s compiler caused patching issue.
      // temporarily mark ElPopper as any due to type inconsistency.
      const child = rootMenu.isMenuPopup
        ? h(
          // TODO: correct popper's type.
          ElTooltip as any,
          {
            effect: 'light',
            fallbackPlacements: fallbackPlacements.value,
            gpuAcceleration: false,
            offset: props.popperOffset,
            persistent: true,
            placement: currentPlacement.value,
            popperClass: props.popperClass,
            pure: true,
            ref: vPopper,
            showArrow: false,
            teleported: appendToBody.value,
            transition: menuTransitionName.value,
            visible: opened.value,
          },
          {
            content: () =>
              h(
                'div',
                {
                  class: [
                    nsMenu.m(mode.value),
                    nsMenu.m('popup-container'),
                    props.popperClass,
                  ],
                  onFocus: (evt: FocusEvent) => handleMouseenter(evt, 100),
                  onMouseenter: (evt: MouseEvent) =>
                    handleMouseenter(evt, 100),
                  onMouseleave: () => handleMouseleave(true),
                },
                [
                  h(
                    'ul',
                    {
                      class: [
                        nsMenu.b(),
                        nsMenu.m('popup'),
                        nsMenu.m(`popup-${currentPlacement.value}`),
                      ],
                      style: ulStyle.value,
                    },
                    [slots.default?.()],
                  ),
                ],
              ),
            default: () =>
              h(
                'div',
                {
                  class: nsSubMenu.e('title'),
                  onClick: handleClick,
                },
                titleTag,
              ),
          },
        )
        : h(Fragment, {}, [
          h(
            'div',
            {
              class: nsSubMenu.e('title'),
              onClick: handleClick,
              ref: verticalTitleRef,
            },
            titleTag,
          ),
          h(
            ElCollapseTransition,
            {},
            {
              default: () =>
                withDirectives(
                  h(
                    'ul',
                    {
                      class: [nsMenu.b(), nsMenu.m('inline')],
                      role: 'menu',
                      style: ulStyle.value,
                    },
                    [slots.default?.()],
                  ),
                  [[vShow, opened.value]],
                ),
            },
          ),
        ])

      return h(
        'li',
        {
          ariaExpanded: opened.value,
          ariaHaspopup: true,
          class: [
            nsSubMenu.b(),
            nsSubMenu.is('active', active.value),
            nsSubMenu.is('opened', opened.value),
            nsSubMenu.is('disabled', props.disabled),
          ],
          onFocus: handleMouseenter,
          onMouseenter: handleMouseenter,
          onMouseleave: () => handleMouseleave(true),
          role: 'menuitem',
        },
        [child],
      )
    }
  },
})

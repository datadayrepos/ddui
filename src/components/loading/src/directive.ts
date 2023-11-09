// @ts-nocheck
import { isRef, ref } from 'vue'
import { hyphenate, isObject, isString } from '@vue/shared'
import type { Directive, DirectiveBinding, UnwrapRef } from 'vue'
import { Loading } from './service'
import type { LoadingOptions } from './types'
import type { LoadingInstance } from './loading'

const INSTANCE_KEY = Symbol('ElLoading')

export type LoadingBinding = boolean | UnwrapRef<LoadingOptions>
export interface ElementLoading extends HTMLElement {
  [INSTANCE_KEY]?: {
    instance: LoadingInstance
    options: LoadingOptions
  }
}

function createInstance(el: ElementLoading, binding: DirectiveBinding<LoadingBinding>) {
  const vm = binding.instance

  const getBindingProp = <K extends keyof LoadingOptions>(
    key: K,
  ): LoadingOptions[K] =>
      isObject(binding.value) ? binding.value[key] : undefined

  const resolveExpression = (key: any) => {
    const data = (isString(key) && vm?.[key]) || key
    if (data)
      return ref(data)
    else return data
  }

  const getProp = <K extends keyof LoadingOptions>(name: K) =>
    resolveExpression(
      getBindingProp(name)
        || el.getAttribute(`element-loading-${hyphenate(name)}`),
    )

  const fullscreen
    = getBindingProp('fullscreen') ?? binding.modifiers.fullscreen

  const options: LoadingOptions = {
    background: getProp('background'),
    body: getBindingProp('body') ?? binding.modifiers.body,
    customClass: getProp('customClass'),
    fullscreen,
    lock: getBindingProp('lock') ?? binding.modifiers.lock,
    spinner: getProp('spinner'),
    svg: getProp('svg'),
    svgViewBox: getProp('svgViewBox'),
    target: getBindingProp('target') ?? (fullscreen ? undefined : el),
    text: getProp('text'),
  }
  el[INSTANCE_KEY] = {
    instance: Loading(options),
    options,
  }
}

function updateOptions(newOptions: UnwrapRef<LoadingOptions>, originalOptions: LoadingOptions) {
  for (const key of Object.keys(originalOptions)) {
    if (isRef(originalOptions[key]))
      originalOptions[key].value = newOptions[key]
  }
}

export const vLoading: Directive<ElementLoading, LoadingBinding> = {
  mounted(el, binding) {
    if (binding.value)
      createInstance(el, binding)
  },
  unmounted(el) {
    el[INSTANCE_KEY]?.instance.close()
  },
  updated(el, binding) {
    const instance = el[INSTANCE_KEY]
    if (binding.oldValue !== binding.value) {
      if (binding.value && !binding.oldValue) {
        createInstance(el, binding)
      }
      else if (binding.value && binding.oldValue) {
        if (isObject(binding.value))
          updateOptions(binding.value, instance!.options)
      }
      else {
        instance?.instance.close()
      }
    }
  },
}

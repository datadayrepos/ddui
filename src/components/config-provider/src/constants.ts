import type { InjectionKey, Ref } from 'vue'
import type { ConfigProviderProps } from './config-provider-props'

export type ConfigProviderContext = Partial<ConfigProviderProps>

export const configProviderContextKey: InjectionKey<
  Ref<ConfigProviderContext>
// eslint-disable-next-line symbol-description
> = Symbol()

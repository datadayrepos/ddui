import { buildProps, definePropType } from '/@/utils'
import { useSizeProp } from '/@/hooks'

import type { ExtractPropTypes } from 'vue'
import type { Language } from '/@/locale'
import type { ButtonConfigContext } from '/@/components/button'
import type { MessageConfigContext } from '/@/components/message'

export interface ExperimentalFeatures {
  // TO BE Defined
}

export const configProviderProps = buildProps({
  /**
   * @description Controlling if the users want a11y features
   */
  a11y: {
    default: true,
    type: Boolean,
  },
  /**
   * @description button related configuration, [see the following table](#button-attributes)
   */
  button: {
    type: definePropType<ButtonConfigContext>(Object),
  },
  /**
   * @description features at experimental stage to be added, all features are default to be set to false                                                                                | ^[object]
   */
  experimentalFeatures: {
    type: definePropType<ExperimentalFeatures>(Object),
  },
  /**
   * @description Controls if we should handle keyboard navigation
   */
  keyboardNavigation: {
    default: true,
    type: Boolean,
  },
  /**
   * @description Locale Object
   */
  locale: {
    type: definePropType<Language>(Object),
  },
  /**
   * @description message related configuration, [see the following table](#message-attributes)
   */
  message: {
    type: definePropType<MessageConfigContext>(Object),
  },
  /**
   * @description global component className prefix (cooperated with [$namespace](https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/mixins/config.scss#L1)) | ^[string]
   */
  namespace: {
    default: 'el',
    type: String,
  },
  /**
   * @description global component size
   */
  size: useSizeProp,
  /**
   * @description global Initial zIndex
   */
  zIndex: Number,
} as const)
export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

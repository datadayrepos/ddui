/**
 * Created by Ivar.Strand on 2021/07/21 11.23 TODO allign w iconresolver
 */

import { defineAsyncComponent } from 'vue'

const SymbolArrowDownIcon = defineAsyncComponent(() =>
  import('../../modulesVue/useIcons/icons/SymbolArrowDownIcon.vue'),
)
const SymbolArrowLeftIcon = defineAsyncComponent(() =>
  import('../../modulesVue/useIcons/icons/SymbolArrowLeftIcon.vue'),
)
const SymbolArrowRightIcon = defineAsyncComponent(() =>
  import('../../modulesVue/useIcons/icons/SymbolArrowRightIcon.vue'),
)
const SymbolArrowUpIcon = defineAsyncComponent(() =>
  import('../../modulesVue/useIcons/icons/SymbolArrowUpIcon.vue'),
)
const SymbolCalendarIcon = defineAsyncComponent(() =>
  import('../../modulesVue/useIcons/icons/SymbolCalendarIcon.vue'),
)
const SymbolCheckboxCircleIcon = defineAsyncComponent(() =>
  import('../../modulesVue/useIcons/icons/SymbolCheckboxCircleIcon.vue'),
)
const SymbolCircleCloseFilledIcon = defineAsyncComponent(() =>
  import('../../modulesVue/useIcons/icons/SymbolCircleCloseFilledIcon.vue'),
)
const SymbolClockIcon = defineAsyncComponent(() =>
  import('../../modulesVue/useIcons/icons/SymbolClockIcon.vue'),
)
const SymbolCloseXIcon = defineAsyncComponent(() =>
  import('../../modulesVue/useIcons/icons/AppBox copy/SymbolCloseXIcon.vue'),
)
const SymbolCheckmarkIcon = defineAsyncComponent(() =>
  import('../../modulesVue/useIcons/icons/SymbolCheckmarkIcon.vue'),
)

const SymbolArrowLeft2Icon = defineAsyncComponent(() =>
  import('../../modulesVue/useIcons/icons/SymbolArrowLeft2Icon.vue'),
)
const SymbolArrowRight2Icon = defineAsyncComponent(() =>
  import('/@/modulesVue/useIcons/icons/SymbolArrowRight2Icon.vue'),
)
const Delete = defineAsyncComponent(() =>
  import('/@/modulesVue/useIcons/icons/Delete/index.vue'),
)
const Document = defineAsyncComponent(() =>
  import('/@/modulesVue/useIcons/icons/Document/index.vue'),
)
const Hide = defineAsyncComponent(() =>
  import('/@/modulesVue/useIcons/icons/Hide/index.vue'),
)
const IconCaretDown = defineAsyncComponent(() =>
  import('/@/modulesVue/useIcons/icons/IconCaretDown/index.vue'),
)
const IconCaretUp = defineAsyncComponent(() =>
  import('/@/modulesVue/useIcons/icons/IconCaretUp/index.vue'),
)
const IconClose = defineAsyncComponent(() =>
  import('/@/modulesVue/useIcons/icons/IconClose/index.vue'),
)
const IconPlus = defineAsyncComponent(() =>
  import('/@/modulesVue/useIcons/icons/IconPlus/index.vue'),
)
const InfoFilled = defineAsyncComponent(() =>
  import('/@/modulesVue/useIcons/icons/InfoFilled/index.vue'),
)
const Loading = defineAsyncComponent(() =>
  import('/@/modulesVue/useIcons/icons/Loading/index.vue'),
)
const Minus = defineAsyncComponent(() =>
  import('/@/modulesVue/useIcons/icons/Minus/index.vue'),
)
const Plus = defineAsyncComponent(() =>
  import('/@/modulesVue/useIcons/icons/Plus/index.vue'),
)
const QuestionFilled = defineAsyncComponent(() =>
  import('/@/modulesVue/useIcons/icons/QuestionFilled/index.vue'),
)

const QuestionOutline = defineAsyncComponent(() =>
  import('/@/modulesVue/useIcons/icons/QuestionOutline/index.vue'),
)
const SuccessFilled = defineAsyncComponent(() =>
  import('/@/modulesVue/useIcons/icons/SuccessFilled/index.vue'),
)
const View = defineAsyncComponent(() =>
  import('/@/modulesVue/useIcons/icons/View/index.vue'),
)
const WarningFilled = defineAsyncComponent(() =>
  import('/@/modulesVue/useIcons/icons/WarningFilled/index.vue'),
)
const ZoomIn = defineAsyncComponent(() =>
  import('/@/modulesVue/useIcons/icons/ZoomIn/index.vue'),
)

export {
  SymbolArrowLeftIcon,
  SymbolArrowRightIcon,
  SymbolArrowUpIcon,
  SymbolArrowDownIcon,
  SymbolCheckmarkIcon,
  SymbolCalendarIcon,
  SymbolCheckboxCircleIcon,
  SymbolCircleCloseFilledIcon,
  SymbolClockIcon,
  SymbolCloseXIcon,
  Delete,
  SymbolArrowLeft2Icon,
  SymbolArrowRight2Icon,
  Document,
  Hide,
  IconCaretDown,
  IconCaretUp,
  IconClose,
  IconPlus,
  //	IconQuestion,
  InfoFilled,
  Loading,
  QuestionOutline,
  QuestionFilled,
  Plus,
  Minus,
  SuccessFilled,
  View,
  WarningFilled,
  ZoomIn,
}

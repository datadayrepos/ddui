import { watch } from 'vue'
import { isClient } from '@datadayrepos/usevueshared'
import type { Ref } from 'vue'
import { useEventListener } from '@datadayrepos/usevuecore'
import { EVENT_CODE } from '../../constants'

interface ModalInstance {
  handleClose: () => void
}

const modalStack: ModalInstance[] = []

function closeModal(e: KeyboardEvent) {
  if (modalStack.length === 0)
    return
  if (e.code === EVENT_CODE.esc) {
    e.stopPropagation()
    const topModal = modalStack[modalStack.length - 1]
    topModal.handleClose()
  }
}

export function useModal(instance: ModalInstance, visibleRef: Ref<boolean>) {
  watch(visibleRef, (val) => {
    if (val)
      modalStack.push(instance)
    else
      modalStack.splice(modalStack.indexOf(instance), 1)
  })
}

if (isClient)
  useEventListener(document, 'keydown', closeModal)
// 2.4.2

import { isClient, isIOS } from '@datadayrepos/usevueshared'

export function isFirefox(): boolean {
  return isClient && /firefox/i.test(window.navigator.userAgent)
}

export { isClient, isIOS }
// 2.4.2

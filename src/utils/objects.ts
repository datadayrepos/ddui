import { get, set } from '@datadayrepos/lodashts'
import type { Entries } from '../typefest/entries'
import type { Arrayable } from '.'

// @ts-expect-error unknown error
export const entriesOf = <T>(arr: T) => Object.entries(arr) as Entries<T>
// export const entriesOf = <T extends Record<string, unknown> | ArrayLike<unknown>>(obj: T) => Object.entries(obj) as Entries<T>
/*
export function entriesOf<T extends Record<string, unknown>>(obj: T) {
  return Object.entries(obj) as Entries<T>
}
*/

// @ts-expect-error unknown error
export const keysOf = <T>(arr: T) => Object.keys(arr) as Array<keyof T>
/*
export function keysOf<T extends Record<string, unknown>>(obj: T) {
  return Object.keys(obj) as Array<keyof T>
}
*/
export { hasOwn } from '@datadayrepos/usevueshared'

export function getProp<T = any>(obj: Record<string, any>, path: Arrayable<string>, defaultValue?: any): { value: T } {
  return {
    get value() {
      return get(obj, path, defaultValue)
    },
    set value(val: any) {
      set(obj, path, val)
    },
  }
}
// 2.4.2

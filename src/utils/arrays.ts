export const unique = <T>(arr: T[]) => [...new Set(arr)]

// TODO: rename to `ensureArray`
/** like `_.castArray`, except falsy value returns empty array. */
export function castArray(arr: any): any[] {
  if (!arr && arr !== 0)
    return []
  return Array.isArray(arr) ? arr : [arr]
}

// TODO: remove import alias
// avoid naming conflicts
// export { castArray as ensureArray } from "lodash-unified";
// 270322 216

/**
 * Casts `value` as an array if it's not one.
 *
 * @since 4.4.0
 * @category Lang
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast array.
 * @example
 *
 * castArray(1)
 * // => [1]
 *
 * castArray({ 'a': 1 })
 * // => [{ 'a': 1 }]
 *
 * castArray('abc')
 * // => ['abc']
 *
 * castArray(null)
 * // => [null]
 *
 * castArray(undefined)
 * // => [undefined]
 *
 * castArray()
 * // => []
 *
 * const array = [1, 2, 3]
 * console.log(castArray(array) === array)
 * // => true
 */
export function ensureArray(...args): Array<any> {
  if (!args.length)
    return []

  const value = args[0]
  return Array.isArray(value) ? value : [value]
}

/**
 * Util module for Objects
 *
 */
/*
 * Returns a list of keys to use in loops so Typescript do not complain about keys
 *
 * @param object - The object
 *
 * ```
 * for(let k in keys(obj))
 * for(let k of keys(obj))
 * ```
 */
// export function keys<O extends object>(obj: O): Array<keyof O> {
//   return Object.keys(obj) as Array<keyof O>;
// }
/*
 * Function that checks if a key is present in an object so Tyepscript do no complain
 *
 * @param obj - The object
 * @param key - The key to check
 *
 * ```
 * if(hasKey(obj,key))
 * ```
 */
export function has_key<O>(obj: O, key: keyof any): key is keyof O {
	return key in obj;
}

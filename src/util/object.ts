/**
 * Util module for Objects
 *
 */
import * as json from './json';
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
	// if(typeof obj === 'undefined')
	//   return false;
	return key in obj;
}

export function serialize(obj:unknown, prefix=''):string{
	const str = [];
	if(typeof obj !== 'object'){
		return '';
	}
	for (const p in obj) {
		if (has_key(obj, p)) {
			const k = prefix ? prefix + "[" + p + "]" : p;
			const v = obj[p];
			str.push((v !== null && typeof v === "object") ?
				serialize(v, k) :
				encodeURIComponent(k) + "=" + encodeURIComponent(v));
		}
	}
	return str.join("&");
}

export function deep_clone<T>(obj:T):T{
	if(!obj || typeof obj !== 'object'){
		return obj;
	}
	return json.clean_parse(json.safe_stringify(obj));
}


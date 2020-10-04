/**
 * Stringify in oneline
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function jsonOneLine(obj:any, white_space=' '):string{
	return JSON.stringify(
		obj,
		(k,v) => { return v === undefined || k === undefined ? 'undefined' : v; },
		white_space
	);
}

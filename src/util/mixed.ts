/**
 * Util mixed functions module
 *
 */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function is_date(v:any): v is Date {
	return Object.prototype.toString.call(v) === '[object Date]';
}

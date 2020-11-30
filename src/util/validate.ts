/**
 * Util mixed functions module
 *
 */

export function date(v:unknown):v is Date {
	return Object.prototype.toString.call(v) === '[object Date]';
}

export function email(v:string):boolean{
	// const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
	// return re.test(v);
	return /\S+@\S+\.\S+/.test(v);
}

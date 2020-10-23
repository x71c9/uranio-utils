/**
 * Stringify in oneline
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function json_one_line(obj:any, white_space=' ')
		:string{
	if(obj == null || typeof obj != 'object'){
		return '';
	}
	try{
		return JSON.stringify(
			obj,
			(k,v) => { return v === undefined || k === undefined ? 'undefined' : v; },
			white_space
		);
	}catch(e){
		return '[ERROR] ' + e.message;
	}
}

/**
 * Module for URANIO Exception
 *
 * @packageDocumentation
 */

// import * as urn_log from '../log/';

class URNException extends Error{
	
	public date:Date;
	
	public name = 'URANIOException';
	
	constructor(public code:string, public msg='', public nested?:Error) {
		
		super(`[${code}] ${msg}`);
		
		const actual_prototype = new.target.prototype;
		
		Object.setPrototypeOf(this, actual_prototype);
		
		this.date = new Date();
		
		// urn_log.error(this.message);
		
	}
	
}

/*
 * Export only the type of the class URNException
 */
export type ExceptionInstance = InstanceType<typeof URNException>;

// export default function create(code:string, message='', nested?:Error)
//     :ExceptionInstance{
//   return new URNException(code, message, nested);
// }

type CreateException = {
	create(err_code:string, exception_message:string, nested?:Error):ExceptionInstance;
}

export function init(code_prepend:string, module_name:string):CreateException{
	return {
		create: function(err_code:string, exception_message:string, nested?:Error){
			return new URNException(
				`${code_prepend}-${err_code}`,
				`${module_name}. ${exception_message}`,
				nested
			);
		}
	};
}

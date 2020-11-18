/**
 * Module for URANIO Exception
 *
 * @packageDocumentation
 */

export class URNException extends Error{
	
	public date:Date;
	
	constructor(public code:string, public message='', public nested?:Error) {
		
		super(message);
		
		const actual_prototype = new.target.prototype;
		
		Object.setPrototypeOf(this, actual_prototype);
		
		this.date = new Date();
		
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
	create(code_num:number, exception_message:string):ExceptionInstance;
}

export function init(code_prepend:string, module_name:string):CreateException{
	return {
		create: function(code_num:number, exception_message:string){
			return new URNException(
				`${code_prepend}-${String(code_num).padStart(3,'0')}`,
				`${module_name}. ${exception_message}`
			);
		}
	};
}

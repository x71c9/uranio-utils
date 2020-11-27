/**
 * Module for URANIO Exception
 *
 * @packageDocumentation
 */

import {ExceptionType} from './types';

class URNException extends Error{
	
	public date:Date;
	
	public name = 'URANIOException';
	
	public type:ExceptionType = ExceptionType.GENERAL;
	
	constructor(public code:string, public msg='', public nested?:Error) {
		
		super();
		
		this.message = `[${code}] ${msg}`;
		
		if(nested && nested.message)
			this.message += ` ${nested.message}`;
		
		const actual_prototype = new.target.prototype;
		
		Object.setPrototypeOf(this, actual_prototype);
		
		this.date = new Date();
		
	}
	
}

class URNNotFoundException extends URNException {
	
	public name = 'URANIONotFoundException';
	
	public type:ExceptionType = ExceptionType.NOT_FOUND;
	
}

/*
 * Export only the type of the class URNException
 */
export type ExceptionInstance = InstanceType<typeof URNException>;

export type NotFoundExceptionInstance = InstanceType<typeof URNNotFoundException>;

type CreateException = {
	
	create(err_code:string, exception_message:string, nested?:Error):ExceptionInstance;
	
	create_not_found(err_code:string, exception_message:string, nested?:Error):NotFoundExceptionInstance;
	
}

export function init(code_prepend:string, module_name:string):CreateException{
	
	return {
		
		create: function(err_code:string, exception_message:string, nested?:Error){
			return new URNException(
				`${code_prepend}_${err_code}`,
				`${module_name}. ${exception_message}`,
				nested
			);
		},
		
		create_not_found: function(err_code:string, exception_message:string, nested?:Error){
			return new URNNotFoundException(
				`${code_prepend}_${err_code}`,
				`${module_name}. ${exception_message}`,
				nested
			);
		}
		
	};
	
}




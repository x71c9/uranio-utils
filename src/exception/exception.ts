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
	
	constructor(
		public module_code:string,
		public module_name:string,
		public error_code:string,
		public msg:string,
		public nested?:Error
	) {
		
		super();
		
		this.message = `[${module_code}_${error_code}]`;
		this.message += ` ${module_name}. ${msg}`;
		
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

class URNInvalidAtomException extends URNException {
	
	public name = 'URANIOInvalidAtomException';
	
	public type:ExceptionType = ExceptionType.INVALID_ATOM;
	
	constructor(
		module_code:string,
		module_name:string,
		error_code:string,
		msg:string,
		public object?:any,
		public keys?:any[],
		nested?:Error
	) {
		super(module_code, module_name, error_code, msg, nested);
	}
	
}

class URNUnauthorizedException extends URNException {
	
	public name = 'URANIOUnauthorizedException';
	
	public type:ExceptionType = ExceptionType.UNAUTHORIZED;
	
}

export type ExceptionInstance = InstanceType<typeof URNException>;

export type NotFoundExceptionInstance = InstanceType<typeof URNNotFoundException>;

export type InvalidAtomExceptionInstance = InstanceType<typeof URNInvalidAtomException>;

export type UnauthorizedExceptionInstance = InstanceType<typeof URNUnauthorizedException>;

interface CreateException {
	
	create(err_code:string, msg:string, nested?:Error):ExceptionInstance;
	
	create_not_found(err_code:string, msg:string, nested?:Error):NotFoundExceptionInstance;
	
	create_invalid_atom(err_code:string, msg:string, object?:any, keys?:any[], nested?:Error):InvalidAtomExceptionInstance;
	
	create_unauthorized(err_code:string, msg:string, nested?:Error):UnauthorizedExceptionInstance;
	
}

export function init(module_code:string, module_name:string):CreateException{
	return {
		create: function(err_code:string, msg:string, nested?:Error){
			return new URNException(module_code, module_name, err_code, msg, nested);
		},
		create_not_found: function(err_code:string, msg:string, nested?:Error){
			return new URNNotFoundException(module_code, module_name, err_code, msg, nested);
		},
		create_invalid_atom: function(err_code:string, msg:string, object?:any, keys?:any[], nested?: Error){
			return new URNInvalidAtomException(module_code, module_name, err_code, msg, object, keys, nested);
		},
		create_unauthorized: function(err_code: string, msg:string, nested?:Error){
			return new URNUnauthorizedException(module_code, module_name, err_code, msg, nested);
		}
	};
}




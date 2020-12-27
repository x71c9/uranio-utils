/**
 * Module for URANIO error
 *
 * @packageDocumentation
 */

import * as urn_log from '../log/';

export class URNError extends Error{
	
	constructor(public message='', error?:Error) {
		
		super(message);
		
		urn_log.error(message);
		
		if(error)
			urn_log.error(error);
		
		const actual_prototype = new.target.prototype;
		
		Object.setPrototypeOf(this, actual_prototype);
		
	}
	
}

/*
 * Export only the type of the class URNError
 */
export type ErrorInstance = InstanceType<typeof URNError>;

/**
 * A function the will create a URNError instance.
 * Its parameters are the same as the constructor of the class.
 */
export default function create(message='', error?:Error)
		:ErrorInstance{
	
	// urn_log.fn_debug('create for URNError');
	
	return new URNError(message,error);
}

/**
 * Export module type for URNResponse
 *
 * @packageDocumentation
 */

/*
 * URNResponse "abstract" interface
 */
interface AbstractResponse<T = null> {
	
	/*
	 * Status as number. It follows the HTTP status codes
	 */
	status:number;
	
	/*
	 * If it is set to true the response has no error
	 */
	success:boolean;
	
	/*
	 * The payload of the response
	 */
	payload:T;
	
	/*
	 * A human readable message of the response
	 */
	message?:string;
	
	/*
	 * The exception if any
	 */
	ex?:any|null;
	
}

/**
 * URNResponse interface for success
 */
export interface Success<T = null> extends AbstractResponse<T> {
	
	/*
	 * Status must be 200
	 */
	status: 200;
	
	/*
	 * Success must be true
	 */
	success: true;
	
	/*
	 * Payload of the response
	 */
	payload: T;
	
	/*
	 * Message of the response
	 */
	message?: string;
	
}

/**
 * URNResponse interface for failure
 */
export interface Fail<T = null> extends AbstractResponse<T> {
	
	/*
	 * Status must be 200
	 */
	status: number;
	
	/*
	 * Success must be false or null
	 */
	success: false;
	
	/*
	 * Payload of the response
	 */
	payload: T;
	
	/*
	 * Message of the response
	 */
	message?: string;
	
	/*
	 * Error code
	 */
	err_code: string;
	
	/*
	 * Error message
	 */
	err_msg: string;
	
	/*
	 * The exception if any
	 */
	ex?: Error|null;
	
}

/*
 * URANIO middleware General response, conjunction with Success and Fail
 * with two possible generic type for their payloads
 */
export type General<T = null, K = null> = Success<T> | Fail<K>;

/*
 * URANIO middleware boolean response interface
 */
export interface UBoolean<T extends boolean = boolean> {
	
	/*
	 * Boolean response
	 */
	success:T;

	/*
	 * Boolean response message
	 */
	message?:string;
}


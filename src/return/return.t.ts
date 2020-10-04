export namespace URNResponse {
	
	/*
	 * URANIO Response "abstract" interface
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
	 * URANIO Response interface for success
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
	 * URANIO Response interface for failure
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
		 * The exception if any
		 */
		ex?: Error|null;
		
	}
	
	/*
	 * URANIO middleware response conjunction with Success or ResError
	 * with two possible generic type for their payloads
	 */
	export type Response<T = null, K = null> = Success<T> | Fail<K>;
	
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
	
	/*
	 * Define ReturnType type that infer the return type of a function
	 */
	export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
	
	/**
	 * Return true if the response is a Response
	 *
	 * @param response - a possible Response
	 */
	export function isResponse<T,Q>(response:Response<T,Q>): response is Response<T,Q> {
		return (typeof response.success !== undefined && typeof response.status !== undefined);
	}
	
	/**
	 * Return true if the response is a Success
	 *
	 * @param response - a Response
	 */
	export function isSuccess<T,Q>(response:Response<T,Q>): response is Success<T> {
		return response.success;
	}
	
	/**
	 * Return true if the response is a Fail
	 *
	 * @param response - a Response
	 */
	export function isFail<T,Q>(response:Response<T,Q>): response is Fail<Q> {
		return !response.success;
	}
	
	/**
	 * Return true if the response is a Boolean<true>
	 *
	 * @param response - a Response
	 */
	export function isTrue(response:UBoolean<any>): response is UBoolean<true> {
		return response.success;
	}
	
	/**
	 * Return true if the response is a Boolean<false>
	 *
	 * @param response - a Response
	 */
	export function isFalse(response:UBoolean<any>): response is UBoolean<false> {
		return !response.success;
	}
	
}


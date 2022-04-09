/**
 * Middleware module for formatting responses
 *
 * @packageDocumentation
 */

/*
 * Import Response module
 */
import {General, Success, Fail, UBoolean, is_success, is_fail}
	from '../response/index';

import * as urn_log from '../log/';

/*
 * Import Return types
 */
import {ReturnInjectable} from './types';

/**
 * Class URNReturn has all the methods for creating Response objects.
 * Its constructor accepts an array of ReturnInjectable objects.
 * This type of objects must have two functions:
 * `success_handler` and `fail_handler`.
 * These methods will be injected in the response as middleware.
 *
 * Async handlers are not managed for now.
 * Most common case is for logging.
 *
 * The class is designed so that each module that imports it
 * should have its own instance and its own injectable objects.
 */
class URNReturn {
	
	/**
	 * An array of injectable objects.
	 */
	public inject_objects: ReturnInjectable[];
	
	/**
	 * Constructor function
	 *
	 * @param inject_objects - will set the array of injectable objects
	 */
	constructor(inject_objects?:ReturnInjectable|ReturnInjectable[]){
		this.inject_objects = [];
		if(inject_objects)
			this.push_injects(inject_objects);
	}
	
	/**
	 * Method for checking if the injectable object has the methods needed
	 * and for pushing it to the inject_objects array.
	 *
	 * @param inject_object - the object to check and add
	 *
	 */
	private _add_inject(inject_object:ReturnInjectable)
			:void{
		if(typeof inject_object.fail_handler === 'function' &&
				typeof inject_object.success_handler === 'function'){
			this.inject_objects.push(inject_object);
		}
	}
	
	/**
	 * Method that accept one or an array of injectable objects and
	 * add it/them to the injcet_objects array
	 *
	 * @param inject_objects - the object/s to add
	 */
	public push_injects(inject_objects:ReturnInjectable|ReturnInjectable[])
			:void{
		if(Array.isArray(inject_objects)){
			for(const inj of inject_objects)
				this._add_inject(inj);
		}else{
			this._add_inject(inject_objects);
		}
	}
	
	/**
	 * Method that will run all the injectable object's success_halder methods.
	 *
	 * @param response - the Success response that will be given to the handlers
	 */
	private _run_success_handlers<T>(response: Success<T>)
			:Success<T>{
		if(this.inject_objects.length > 0){
			for(const inj_obj of this.inject_objects){
				if(inj_obj.success_handler)
					response = inj_obj.success_handler(response);
			}
		}
		return response;
	}
	
	/**
	 * Method that will run all the injectable object's fail_halder methods.
	 *
	 * @param response - the Fail response that will be given to the handlers
	 */
	private _run_fail_handlers<T>(response: Fail<T>)
			:Fail<T>{
		if(this.inject_objects.length > 0){
			for(const inj_obj of this.inject_objects){
				if(inj_obj.fail_handler)
					response = inj_obj.fail_handler(response);
			}
		}
		return response;
	}
	
	/**
	 * Returns a response for an async function
	 *
	 * The return type of this function is a General
	 * with success generic type T equal to the return type of
	 * the async handler Promise
	 *
	 * @param handler [optional] - The function to call
	 * @param name [optional] - The name of the response
	 */
	public async_res<R>(handler:(...args:any[]) => Promise<R>, name?:string, meta?:any){
		return async (param_object?:any):Promise<General<R>> => {
			try{
				const response:Success<R> = {
					status: 200,
					success: true,
					payload: await handler(param_object)
				};
				if(typeof meta !== 'undefined'){
					response.meta = meta;
				}
				return this._run_success_handlers(response);
			}catch(ex){
				return this.return_error(500,
					'URANIO ERROR ['+name+'] - ' + ex.message, ex.code, ex.msg, null, ex);
			}
		};
	}

	/**
	 * Returns a response for a function
	 *
	 * The return type of this function is a General response
	 * with success generic type T equal to the return type of
	 * the handler function
	 *
	 * @param handler [optional] - The function to call
	 * @param name [optional] - The name of the response
	 */
	public res<R>(handler:(...args:any[]) => R, name?:string, meta?:any){
		return (param_object?:any):General<ReturnType<typeof handler>> => {
			try{
				const response:Success<R> = {
					status: 200,
					success: true,
					payload: handler(param_object)
				};
				if(typeof meta !== 'undefined'){
					response.meta = meta;
				}
				return this._run_success_handlers(response);
			}catch(ex){
				return this.return_error(500,
					'URANIO ERROR ['+name+'] - ' + ex.message, ex.code, ex.msg, null, ex);
			}
		};
	}
	
	/**
	 * Returns a response object by looking into its payload.
	 * If there is an error will not look into its playload.
	 * If the payload has an error will return that error.
	 * Otherwse will return the payload and the message of its payload.
	 *
	 * @param result - The main response
	 * @param name [optional] - The name of the response
	 */
	public inherit_res(result:General<General>, name?:string, meta?:any)
			:General{
		const return_result:General = {
			status: 200,
			message: '',
			success: false,
			err_code: '',
			err_msg: '',
			payload: null
		};
		if(typeof meta !== 'undefined'){
			return_result.meta = meta;
		}
		if(is_fail(result)){
			return_result.status = result.status;
			return_result.message = (name) ?
				name + ' - ' + result.message : result.message;
			return_result.ex = result.ex;
			return return_result;
		}
		if(!is_fail(result.payload) && !is_success(result.payload)){
			return_result.message = (name) ?
				name + ' - ' + result.message : result.message;
			return return_result;
		}
		if(is_fail(result.payload)){
			return_result.status = result.payload.status;
			return_result.message = (name) ?
				name + ' - ' + result.payload.message : result.payload.message;
			return_result.ex = result.payload.ex;
			return return_result;
		}
		return_result.message = (name) ?
			name + ' - ' + result.payload.message : result.payload.message;
		return_result.payload = result.payload.payload;
		if(typeof result.meta !== 'undefined'){
			return_result.meta = result.meta;
		}
		return return_result;
	}
	
	/**
	 * Returns a response error object
	 *
	 * Method overload: different return type for different arguments
	 * If payload in present will return a Fail with generic type the type of
	 * the payload
	 *
	 * @param status - Status as number. It follows the HTTP status codes
	 * @param message [optional] - A human readable message of the response
	 * @param payload [optional] - A payload
	 * @param ex [optional] - An exception
	 */
	public return_error(status:number, message:string, err_code:string, err_msg:string, payload?:null, ex?:Error | null, meta?:any):Fail;
	public return_error<T>(status:number, message:string, err_code:string, err_msg:string, payload:T, ex?:Error | null, meta?:any):Fail<T>;
	public return_error<T>(status:number, message:string, err_code:string, err_msg:string, payload:T, ex?:Error | null, meta?:any):Fail<T> | Fail{
		// if there is a payload
		if(arguments.length > 4){
			const urn_response:Fail<T> = {
				status: status,
				message: message,
				err_code: err_code,
				err_msg: err_msg,
				ex: (ex) ? ex : null,
				payload: payload,
				success: false
			};
			if(typeof meta !== 'undefined'){
				urn_response.meta = meta;
			}
			return this._run_fail_handlers(urn_response);
		}else{
			const urn_response:Fail = {
				status: status,
				message: message,
				err_code: err_code,
				err_msg: err_msg,
				ex: null,
				payload: null,
				success: false
			};
			if(typeof meta !== 'undefined'){
				urn_response.meta = meta;
			}
			return this._run_fail_handlers(urn_response);
		}
	}
	
	/**
	 * Returns a successful response object
	 *
	 * Method overload: different return type for different arguments
	 * If payload in present will return a Success with generic type the type of
	 * the payload
	 *
	 * @param message [optional] - A human readable message of the response
	 * @param payload [optional] - A payload
	 */
	public return_success(message:string, payload?:null, meta?:any):Success;
	public return_success<T>(message:string, payload:T, meta?:any):Success<T>;
	public return_success<T>(message:string, payload:T, meta?:any):Success<T> | Success{
		// if there is a payload
		if(arguments.length > 1){
			const urn_response:Success<T> = {
				status: 200,
				success: true,
				message: message,
				payload: payload
			};
			if(typeof meta !== 'undefined'){
				urn_response.meta = meta;
			}
			return this._run_success_handlers(urn_response);
		}else{
			const urn_response:Success = {
				status: 200,
				success: true,
				message: message,
				payload: null
			};
			if(typeof meta !== 'undefined'){
				urn_response.meta = meta;
			}
			return this._run_success_handlers(urn_response);
		}
	}
	
	/**
	 * Returns a successful boolean response with optional message
	 *
	 * @param message [optional] - A message to append
	 */
	public return_true(message?:string, meta?:any):UBoolean<true>{
		const urn_boolean:UBoolean<true> = {
			success: true
		};
		if(typeof meta !== 'undefined'){
			urn_boolean.meta = meta;
		}
		if(arguments.length>0)
			urn_boolean.message = message;
		return urn_boolean;
	}
	
	/**
	 * Retunrs a not successful boolean response with optional message
	 *
	 * @param message [optional] - A message to append
	 */
	public return_false(message?:string, meta?:any):UBoolean<false>{
		const urn_boolean:UBoolean<false> = {
			success: false
		};
		if(typeof meta !== 'undefined'){
			urn_boolean.meta = meta;
		}
		if(arguments.length>0)
			urn_boolean.message = message;
		return urn_boolean;
	}
	
}

/*
 * Export only the type of the class URNReturn
 */
export type ReturnInstance = InstanceType<typeof URNReturn>;

/**
 * A function the will create a URNReturn instance.
 * Its parameters are the same as the constructor of the class.
 */
export default function create_instance(inject?:ReturnInjectable|ReturnInjectable[])
		:ReturnInstance{
	
	urn_log.fn_debug('create for URNReturn');
	
	return new URNReturn(inject);
}

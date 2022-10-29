/**
 * Util module for log module
 *
 * @packageDocumentation
 */

import dateFormat from 'dateformat';

import {safe_stringify_oneline} from '../util/json';

import {ReturnInjectable} from '../return/types';

export {console_injectors} from './console_injectors';

import {LogContext} from './types';

import {trace, debug, error} from './log';

import log_defaults from './log.defaults';

/**
 * Method for creating an injectable object
 *
 * This object can be used in "return" module.
 */
export const return_injector:ReturnInjectable = {
	success_handler: (p) => {
		debug(p);
		return p;
	},
	fail_handler: (p) => {
		error(p);
		return p;
	}
};


export namespace decorators {
	
	/**
	 * Class @decorator function for loggin constructor with arguments
	 *
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	export function debug_constructor<T extends { new (...constr_args:any[]):any }>(constr_func: T){
		const ExtClass = class extends constr_func {
			constructor(...args: any[]){
				trace_contructor(random_id(), constr_func.name, format_args(args, log_defaults.max_str_length));
				super(...args);
			}
		};
		for(const property_name of Object.getOwnPropertyNames(constr_func)) {
			const descriptor = Object.getOwnPropertyDescriptor(constr_func, property_name)!;
			if(property_name != 'prototype')
				Object.defineProperty(ExtClass, property_name, descriptor);
		}
		return ExtClass;
	}

	/**
	 * Class @decorator function for logging each method inside the class
	 *
	 * The function return a decorator function.
	 *
	 * @param target - the class itself (check Decorator documentation)
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	export function debug_methods(target:Function)
			:void{
		//constructor methods
		for(const property_name of Object.getOwnPropertyNames(target.prototype)) {
			const descriptor = Object.getOwnPropertyDescriptor(target.prototype, property_name)!;
			if(!(descriptor.value instanceof Function) || property_name == 'constructor')
				continue;
			if(typeof (descriptor as any).no_debug === undefined)
				replace_method_with_logs(target, descriptor, property_name);
			replace_method_with_logs(target, descriptor, property_name);
			Object.defineProperty(target.prototype, property_name, descriptor);
		}
		//static methods
		for(const property_name of Object.getOwnPropertyNames(target)) {
			const descriptor = Object.getOwnPropertyDescriptor(target, property_name)!;
			if(!(descriptor.value instanceof Function) || property_name == 'constructor')
				continue;
			replace_method_with_logs(target, descriptor, property_name, '[static]');
			Object.defineProperty(target, property_name, descriptor);
		}
	}
	
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	export function no_debug(_1: any, _2: string, descriptor: PropertyDescriptor)
			:void{
		(descriptor as any).no_debug = true;
	}
	
}

/**
 * Generate random id
 */
function random_id():string{
	const milliseconds = dateFormat(new Date(), 'l');
	return (Math.floor(Math.random()*100) + '' + milliseconds).padStart(5,'0');
}

/**
 * Debug constructor with arguments
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param constructor_name - The constructor name.
 * @param str_args - A string containing the arguments.
 */
function trace_contructor(rand_id:string, constructor_name:string, str_args:string)
		:void{
	if(!log_defaults.full_trace){
		return;
	}
	trace(`[${rand_id}] new ${constructor_name}(${str_args})`);
}

/**
 * Debug private constructor with arguments
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param constructor_name - The constructor name.
 * @param str_args - A string containing the arguments.
 */
// function trace_private_constructor(rand_id:string, constructor_name:string, str_args:string)
//     :void{
//   trace(`[${rand_id}] private ${constructor_name}(${str_args})`);
// }

/**
 * Debug a method with arguments
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param target_name - The name of the class being called.
 * @param method - The name of the method being called.
 * @param str_args - A string containing the arguments.
 */
function trace_method_with_args(rand_id:string, target_name:string, method:string, str_args:string)
		:void{
	if(!log_defaults.full_trace){
		return;
	}
	trace(`[${rand_id}] ${target_name}.${method}(${str_args})`);
}

/**
 * Debug a response of a method
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param target_name - The name of the class being called.
 * @param method - The name of the method being called.
 * @param str_result - The result of the method as string.
 * @param is_promise - A boolean value, true if the method return a Promise.
 */
function trace_method_response(rand_id:string, target_name:string, method:string, str_result:string, is_promise=false)
		:void{
	if(!log_defaults.full_trace){
		return;
	}
	const promise_str = (is_promise) ? ' [Promise]' : '';
	trace(`[${rand_id}] [R]${promise_str} ${target_name}.${method}:`, `${str_result}`);
}

/**
 * Debug a response method error
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param target_name - The name of the class being called.
 * @param method - The name of the method being called.
 * @param err - The error to log.
 */
function trace_method_response_error(rand_id:string, target_name:string, method:string, err:Error)
		:void{
	if(!log_defaults.full_trace){
		return;
	}
	trace(`[${rand_id}] [R] ${target_name}.${method}: ERROR`);
	error(err);
}

/**
 * Format arguments
 *
 * @param args - Array of paramter to format.
 * @param max_str_length - Max string length for formatted arguments.
 */
function format_args(args:any[], max_str_length:number)
		:string{
	let str_args = (args.length > 0) ? `${args}` : '';
	try{
		str_args = (args.length > 0) ?
			safe_stringify_oneline(args, _white_spaces[log_defaults.context]) :
			'';
		str_args = str_args.substring(1,str_args.length-1);
	}catch(e){
		str_args = `[CANNOT FORMAT ARGUMENTS][${e.message}]`;
	}
	if(typeof str_args == 'string' && str_args.length > max_str_length)
		str_args = str_args.substring(0, max_str_length) + '...';
	return str_args;
}

/**
 * Format response into string for debugging
 *
 * @param result - The result to log.
 * @param max_str_length - Max string length for formatted result.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function format_result(result:any, max_str_length:number)
		:string{
	let str_result = `${result}`;
	try{
		str_result = `${result}`;
		str_result = safe_stringify_oneline(result, _white_spaces[log_defaults.context]);
	}catch(e){
		str_result = `[CANNOT FORMAT RESULT][${e.message}]`;
	}
	if(typeof str_result == 'string' && str_result.length > max_str_length)
		str_result = str_result.substring(0, max_str_length) + '...';
	return str_result;
}


/**
 * Helper function that replace method with a new function that logs before and after
 * Used in the decorator function debug_method
 *
 * @param target - the class
 * @param descriptor - the method descriptor
 * @param property_name - the method name
 * @param appendix - a string to add before the name of the property logged
 */
function replace_method_with_logs(
	target:any,
	descriptor:PropertyDescriptor,
	property_name:string,
	appendix=''
){
	const original_method = descriptor.value;
	descriptor.value = function(...args:any[]) {
		const rand_id = random_id();
		const target_name = (appendix!='') ? appendix + ' ' + target.name : target.name;
		trace_method_with_args(
			rand_id,
			target_name,
			property_name,
			format_args(args, log_defaults.max_str_length)
		);
		try{
			const result = original_method.apply(this, args);
			trace_method_response(
				rand_id,
				target_name,
				property_name,
				format_result(result, log_defaults.max_str_length)
			);
			if(result instanceof Promise){
				result.then((data:any) => {
					trace_method_response(
						rand_id,
						target_name,
						property_name,
						format_result(data, log_defaults.max_str_length),
						true);
				}).catch((err:Error) => {
					trace_method_response_error(rand_id, target_name, property_name, err);
				});
			}
			return result;
		}catch(err){
			trace_method_response_error(rand_id, target_name, property_name, err);
			throw err;
		}
	};
}

const _white_spaces = {
	[LogContext.BROWSER]: '',
	[LogContext.TERMINAL]: ' '
}

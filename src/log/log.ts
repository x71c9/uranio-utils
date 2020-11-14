/**
 * Module for logging
 *
 * @packageDocumentation
 */

/*
 * Import dateformat module
 */
import dateFormat from 'dateformat';

/*
 * Import log types
 */
import {LogType} from './types';

/*
 * Import json_one_line formatter
 */
import {json_one_line} from '../util/formatter';

/*
 * Import log configuration file
 */
import log_defaults from './log.defaults';

/*
 * Export log_defaults as config
 */
export {log_defaults as defaults};

/*
 * Import ReturnInjectable
 */
import {ReturnInjectable} from '../return/types';

/*
 * Import console injectors
 */
import {console_injectors} from './console_injectors';

/*
 * Set default injector
 */
const log_injector = (log_defaults.context == 'browser') ?
	console_injectors.browser : console_injectors.terminal;

log_defaults.injectors.push(log_injector);

/**
 * Function that will check the type and run the corresponding injector method
 *
 * @param type - the injector method type, same as LogType.
 * @param ...params - parameters to log.
 */
function _run_injector(type:LogType, ...params:any[]){
	if(!Array.isArray(log_defaults.injectors) || log_defaults.injectors.length == 0)
		return;
	for(const injector of log_defaults.injectors){
		if(typeof injector !== 'object')
			return;
		switch(type){
			case 'error':
				if(typeof injector.error_inject === 'function')
					injector.error_inject(...params);
				break;
			case 'warn':
				if(typeof injector.warn_inject === 'function')
					injector.warn_inject(...params);
				break;
			case 'debug':
				if(typeof injector.debug_inject === 'function')
					injector.debug_inject(...params);
				break;
			case 'fn_debug':
				if(typeof injector.fn_debug_inject === 'function')
					injector.fn_debug_inject(...params);
				break;
		}
	}
}

/**
 * Debug functions log
 *
 * @param ...params - variables to log
 */
export function fn_debug(...params:any[])
		:void{
	if(log_defaults.log_level > 3){
		_run_injector('fn_debug', ...params);
	}
}

/**
 * Debug log
 *
 * @param ...params - variables to log
 */
export function debug(...params:any[])
		:void{
	if(log_defaults.log_level > 2){
		_run_injector('debug', ...params);
	}
}

/**
 * Warning log
 *
 * @param ...params - variables to log
 */
export function warn(...params:any[])
		:void{
	if(log_defaults.log_level > 1){
		_run_injector('warn', ...params);
	}
}

/**
 * Error log
 *
 * @param ...params - variables to log
 */
export function error(...params:any[])
		:void{
	if(log_defaults.log_level > 0){
		_run_injector('error', ...params);
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
function fn_debug_constructor(rand_id:string, constructor_name:string, str_args:string)
		:void{
	fn_debug(`[${rand_id}] new ${constructor_name}(${str_args})`);
}

/**
 * Debug private constructor with arguments
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param constructor_name - The constructor name.
 * @param str_args - A string containing the arguments.
 */
// function fn_debug_private_constructor(rand_id:string, constructor_name:string, str_args:string)
//     :void{
//   fn_debug(`[${rand_id}] private ${constructor_name}(${str_args})`);
// }

/**
 * Debug a method with arguments
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param target_name - The name of the class being called.
 * @param method - The name of the method being called.
 * @param str_args - A string containing the arguments.
 */
function fn_debug_method_with_args(rand_id:string, target_name:string, method:string, str_args:string)
		:void{
	fn_debug(`[${rand_id}] ${target_name}.${method}(${str_args})`);
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
function fn_debug_method_response(rand_id:string, target_name:string, method:string, str_result:string, is_promise=false)
		:void{
	const promise_str = (is_promise) ? ' [Promise]' : '';
	fn_debug(`[${rand_id}] [R]${promise_str} ${target_name}.${method}:`, `${str_result}`);
}

/**
 * Debug a response method error
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param target_name - The name of the class being called.
 * @param method - The name of the method being called.
 * @param error - The error to log.
 */
function fn_debug_method_response_error(rand_id:string, target_name:string, method:string, err:Error)
		:void{
	fn_debug(`[${rand_id}] [R] ${target_name}.${method}: ERROR`);
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
		str_args = (args.length > 0) ? json_one_line(args) : '';
		str_args = str_args.substr(1,str_args.length-2);
	}catch(e){
		str_args = `[CANNOT FORMAT ARGUMENTS][${e.message}]`;
	}
	if(typeof str_args == 'string' && str_args.length > max_str_length)
		str_args = str_args.substr(0, max_str_length) + '...';
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
		str_result = json_one_line(result);
	}catch(e){
		str_result = `[CANNOT FORMAT RESULT][${e.message}]`;
	}
	if(typeof str_result == 'string' && str_result.length > max_str_length)
		str_result = str_result.substr(0, max_str_length) + '...';
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
		fn_debug_method_with_args(
			rand_id,
			target_name,
			property_name,
			format_args(args, log_defaults.max_str_length)
		);
		try{
			const result = original_method.apply(this, args);
			fn_debug_method_response(
				rand_id,
				target_name,
				property_name,
				format_result(result, log_defaults.max_str_length)
			);
			if(result instanceof Promise){
				result.then((data:any) => {
					fn_debug_method_response(
						rand_id,
						target_name,
						property_name,
						format_result(data, log_defaults.max_str_length),
						true);
				}).catch((err:Error) => {
					fn_debug_method_response_error(rand_id, target_name, property_name, err);
				});
			}
			return result;
		}catch(err){
			fn_debug_method_response_error(rand_id, target_name, property_name, err);
			throw err;
		}
	};
}


export namespace decorators {
	
	/**
	 * Class @decorator function for loggin constructor with arguments
	 *
	 * @param log_instance - the log instance that will be used for logging
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	export function debug_constructor<T extends { new (...constr_args:any[]):any }>(constr_func: T){
		const ExtClass = class extends constr_func {
			constructor(...args: any[]){
				fn_debug_constructor(random_id(), constr_func.name, format_args(args, log_defaults.max_str_length));
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
	
}

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




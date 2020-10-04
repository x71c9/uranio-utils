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
 * Import jsonOneLine formatter
 */
import {jsonOneLine} from '../util/formatter';

/*
 * Import log configuration file
 */
import log_defaults from './log.defaults';

/*
 * Import URNLogType
 */
import {URNLogType} from './log.t';

/*
 * Export imported URNLogLevel as LogLevel
 */
export {URNLogLevel as LogLevel} from './log.t';

/*
 * Export log_defaults as config
 */
export {log_defaults as config};

/*
 * Import URNResponseInjectable
 */
import {URNResponseInjectable} from '../util/response_injectable.t';

/**
 * Function that will check the type and run the corresponding injector method
 *
 * @param type - the injector method type, same as URNLogType.
 * @param ...params - parameters to log.
 */
function _run_injector(type:URNLogType, ...params:any[]){
	if(!Array.isArray(log_defaults.injectors) || log_defaults.injectors.length == 0)
		return;
	for(const injector of log_defaults.injectors){
		switch(type){
			case 'error':
				if(typeof injector.error_inject === 'function')
					injector.error_inject(...params);
				break;
			case 'warn':
				if(typeof injector.warn_inject === 'function')
					injector.warn_inject(...params);
				break;
			case 'log':
				if(typeof injector.log_inject === 'function')
					injector.log_inject(...params);
				break;
			case 'debug':
				if(typeof injector.debug_inject === 'function')
					injector.debug_inject(...params);
				break;
			case 'fndebug':
				if(typeof injector.fndebug_inject === 'function')
					injector.fndebug_inject(...params);
				break;
		}
	}
}

/**
 * Debug functions log
 *
 * @param ...params - variables to log
 */
export function fndebug(...params:any[])
		:void{
	if(log_defaults.log_level > 4){
		_run_injector('fndebug', ...params);
	}
}

/**
 * Debug log
 *
 * @param ...params - variables to log
 */
export function debug(...params:any[])
		:void{
	if(log_defaults.log_level > 3){
		_run_injector('debug', ...params);
	}
}

/**
 * Normal log
 *
 * @param ...params - variables to log
 */
export function log(...params:any[])
		:void{
	if(log_defaults.log_level > 2){
		_run_injector('log', ...params);
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
export function randId():string{
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
export function fndebugCostructor(rand_id:string, constructor_name:string, str_args:string)
		:void{
	fndebug(`[${rand_id}] new ${constructor_name}(${str_args})`);
}

/**
 * Debug private constructor with arguments
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param constructor_name - The constructor name.
 * @param str_args - A string containing the arguments.
 */
export function fndebugPrivateCostructor(rand_id:string, constructor_name:string, str_args:string)
		:void{
	fndebug(`[${rand_id}] private ${constructor_name}(${str_args})`);
}

/**
 * Debug a method with arguments
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param target_name - The name of the class being called.
 * @param method - The name of the method being called.
 * @param str_args - A string containing the arguments.
 */
export function fndebugMethodWithArgs(rand_id:string, target_name:string, method:string, str_args:string)
		:void{
	fndebug(`[${rand_id}] ${target_name}.${method}(${str_args})`);
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
export function fndebugMethodResponse(rand_id:string, target_name:string, method:string, str_result:string, is_promise=false)
		:void{
	const promise_str = (is_promise) ? ' [Promise]' : '';
	fndebug(`[${rand_id}] [R]${promise_str} ${target_name}.${method}:`, `${str_result}`);
}

/**
 * Debug a response method error
 *
 * @param rand_id - A random ID that will be use to associate a constructor been called and its response.
 * @param target_name - The name of the class being called.
 * @param method - The name of the method being called.
 * @param error - The error to log.
 */
export function fndebugMethodResponseError(rand_id:string, target_name:string, method:string, error:Error)
		:void{
	fndebug(`[${rand_id}] [R] ${target_name}.${method}: ERROR`);
	fndebug(error);
}

/**
 * Format arguments
 *
 * @param args - Array of paramter to format.
 * @param max_str_length - Max string length for formatted arguments.
 */
export function formatArgs(args:any[], max_str_length:number)
		:string{
	let str_args = (args.length > 0) ? `${args}` : '';
	try{
		str_args = (args.length > 0) ? jsonOneLine(args) : '';
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
export function formatResult(result:any, max_str_length:number)
		:string{
	let str_result = `${result}`;
	try{
		str_result = `${result}`;
		str_result = jsonOneLine(result);
	}catch(e){
		str_result = `[CANNOT FORMAT RESULT][${e.message}]`;
	}
	if(typeof str_result == 'string' && str_result.length > max_str_length)
		str_result = str_result.substr(0, max_str_length) + '...';
	return str_result;
}


/**
 * Class @decorator function for loggin constructor with arguments
 * The function will actually return a decorator function.
 *
 * @param log_instance - the log instance that will be used for logging
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function debug_constructor<T extends { new (...constr_args:any[]):any }>(constr_func: T)
		:{new (...a:any[]):any}{
	const ExtClass = class extends constr_func {
		constructor(...args: any[]){
			fndebugCostructor(randId(), constr_func.name, formatArgs(args, log_defaults.max_str_length));
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
		const rand_id = randId();
		const target_name = (appendix!='') ? appendix + ' ' + target.name : target.name;
		fndebugMethodWithArgs(
			rand_id,
			target_name,
			property_name,
			formatArgs(args, log_defaults.max_str_length)
		);
		const result = original_method.apply(this, args);
		fndebugMethodResponse(
			rand_id,
			target_name,
			property_name,
			formatResult(result, log_defaults.max_str_length)
		);
		if(result instanceof Promise){
			result.then((data:any) => {
				fndebugMethodResponse(
					rand_id,
					target_name,
					property_name,
					formatResult(data, log_defaults.max_str_length),
					true);
			}).catch((err:Error) => {
				fndebugMethodResponseError(rand_id, target_name, property_name, err);
			});
		}
		return result;
	};
}

/**
 * Class @decorator function for logging each method inside the class
 *
 * The function return a decorator function.
 *
 * @param target - the class itself (check Decorator documentation)
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function debug_methods(target:Function):void{
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

/**
 * Method for creating an injectable object
 *
 * This object can be used in "return" module.
 */
export const response_injector:URNResponseInjectable = {
	success_handler: (p) => {
		log(p);
		return p;
	},
	fail_handler: (p) => {
		error(p);
		return p;
	}
};




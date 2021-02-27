/**
 * Module for logging
 *
 * @packageDocumentation
 */

import {LogType} from './types';

import log_defaults from './log.defaults';

export {log_defaults as defaults};

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


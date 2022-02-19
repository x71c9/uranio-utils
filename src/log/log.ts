/**
 * Module for logging
 *
 * @packageDocumentation
 */

import {LogType, LogLevel, LogContext, LogConfig} from './types';

import log_defaults from './log.defaults';

export {log_defaults as defaults};

import {console_injectors} from './console_injectors';


/**
 * Log init
 *
 * @param type - the injector method type, same as LogType.
 * @param context - the injector context type, same as LogContext.
 * @param injectors - this will override the default injector [the console injector]
 */
export function init(log_config?: LogLevel):void
export function init(log_config?: LogConfig):void
export function init(log_config?: LogConfig | LogLevel):void{
	
	if(typeof log_config === 'number'){
		
		log_defaults.log_level = log_config;
		
	}else if(log_config){
		
		if(log_config.level){
			log_defaults.log_level = log_config.level;
		}
		if(log_config.context){
			log_defaults.context = log_config.context;
		}
		if(log_config.prefix){
			log_defaults.prefix = log_config.prefix;
		}
		if(log_config.prefix_type === true){
			log_defaults.prefix_type = true;
		}
		if(log_config.debug_info === false){
			log_defaults.debug_info = false;
		}
		
	}
	if(
		typeof log_config === 'object'
		&& log_config
		&& Array.isArray(log_config.injectors)
		&& log_config.injectors.length > 0
	){
		log_defaults.injectors = log_config.injectors;
	}else{
		const log_injector = (log_defaults.context === LogContext.BROWSER) ?
			console_injectors.browser : console_injectors.terminal;
		log_defaults.injectors = [log_injector];
	}
	for(const cmd of process.argv){
		const splitted = cmd.split('=');
		if(splitted[0] === 'urn_log_prefix_type'){
			log_defaults.prefix_type = (!!splitted[1]);
		}
	}
	
}

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


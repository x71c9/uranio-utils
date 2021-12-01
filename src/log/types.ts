/**
 * Export types module for logging
 *
 * @packageDocumentation
 */

/**
 * LogLevel enum type
 * None = 0
 * Error = 1
 * ...
 */
export enum LogLevel {NONE, ERROR, WARNING, DEBUG, FUNCTION_DEBUG}

/**
 * LogType type
 *
 */
export type LogType = 'error' | 'warn' | 'debug' | 'fn_debug';

/**
 * LogContext type
 *
 */
export type LogContext = 'terminal' | 'browser';

/**
 * Export interface for log injectable object.
 *
 * This type is used in log module where the injectable objects
 * will be injected in the log functions.
 *
 */
export interface LogInjectable{
	
	/**
	 * Method
	 */
	error_inject?(...p:any):void;
	
	/**
	 * Method
	 */
	warn_inject?(...p:any):void;
	
	/**
	 * Method
	 */
	debug_inject?(...p:any):void;
	
	/**
	 * Method
	 */
	fn_debug_inject?(...p:any):void;
	
}

/**
 * Interface for LogDefaults object
 *
 */
export interface LogDefaults {
	
	log_level: LogLevel;
	
	time_format:string;
	
	max_str_length:number;
	
	context:LogContext;
	
	injectors:LogInjectable[];
	
}

